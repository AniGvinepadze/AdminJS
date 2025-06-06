import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { AboutUs } from './schema/about-us.schema';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { v4 } from 'uuid';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectModel('aboutUs') private readonly aboutUsModel: Model<AboutUs>,
    private s3Service: AwsS3Service,
  ) {}

  async create(createAboutUsDto: CreateAboutUsDto) {
    const content = await this.aboutUsModel.create(createAboutUsDto);
    if (!content) throw new BadRequestException('content could not be updated');
    return content;
  }

  uploadImage(filePath, file) {
    return this.s3Service.uploadFile(filePath, file);
  }

  getImage(fileId) {
    return this.s3Service.getImageById(fileId);
  }
  deleteImageById(fileId) {
    return this.s3Service.deleteImageById(fileId);
  }

  findAll() {
    return this.aboutUsModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');
    const content = await this.aboutUsModel.findById(id);
    if (!content) throw new NotFoundException('Content was not found');
    return content;
  }

  async update(
    id: string,
    updateAboutUsDto: UpdateAboutUsDto,
    file?: Express.Multer.File,
  ) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');

    const existingAboutUs = await this.aboutUsModel.findById(id);
    if (!existingAboutUs) throw new NotFoundException('Course not found');

    if (file) {
      const oldImagePath = existingAboutUs.images?.[0];
      if (oldImagePath) {
        await this.s3Service.deleteImageById(oldImagePath);
      }

      const mimetype = file.mimetype.split('/')[1];
      const filePath = `images/${v4()}.${mimetype}`;
      const imageUrl = await this.s3Service.uploadFile(filePath, file);

      if (!imageUrl) {
        throw new BadRequestException('Image upload failed');
      }
      updateAboutUsDto.images = [imageUrl];
    }

    const updatedContent = await this.aboutUsModel.findByIdAndUpdate(
      id,
      updateAboutUsDto,
      { new: true },
    );
    if (!updateAboutUsDto)
      throw new BadRequestException('content could not be updated');
    return { message: 'Content updated successfully', updatedContent };
  }

  async remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');
    const deletedContent = await this.aboutUsModel.findByIdAndDelete(id);
    if (!deletedContent)
      throw new BadRequestException('Content could not be deleted');

    return { message: 'Content deleted successfully', deletedContent };
  }
}
