import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Blog } from './schema/blog.schema';
import { NotFoundError } from 'rxjs';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { v4 } from 'uuid';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel('blog') private readonly blogModel: Model<Blog>,
    private s3Service: AwsS3Service,
  ) {}
  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.blogModel.create(createBlogDto);
    if (!blog) throw new BadRequestException('blog could not be created');
    return blog;
  }

  findAll() {
    return this.blogModel.find();
  }
  uploadImage(filePath, file) {
    return this.s3Service.uploadFile(filePath, file);
  }
  deleteImageById(fileId) {
    return this.s3Service.deleteImageById(fileId);
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');
    const blog = await this.blogModel.findById(id);
    if (!blog) throw new NotFoundException('Blog was not found');
    return blog;
  }

  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
    file?: Express.Multer.File,
  ) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');

       const existingBlog = await this.blogModel.findById(id);
    if (!existingBlog) throw new NotFoundException('Course not found');

 if (file) {
      const oldImagePath = existingBlog.images?.[0];
      if (oldImagePath) {
        await this.s3Service.deleteImageById(oldImagePath);
      }

      const mimetype = file.mimetype.split('/')[1];
      const filePath = `images/${v4()}.${mimetype}`;
      const imageUrl = await this.s3Service.uploadFile(filePath, file);

      if (!imageUrl) {
        throw new BadRequestException('Image upload failed');
      }
      updateBlogDto.images = [imageUrl];
    }

 const updatedContent = await this.blogModel.findByIdAndUpdate(
      id,
      updateBlogDto,
      { new: true },
    );
    if (!updateBlogDto)
      throw new BadRequestException('content could not be updated');
    return { message: 'Content updated successfully', updatedContent };
  }

  async remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');
    const deletedBlog = await this.blogModel.findByIdAndDelete(id);
    if (!deletedBlog)
      throw new BadRequestException('Blog could not be deleted');
    return { message: 'blog deleted successfully', deletedBlog };
  }
}
