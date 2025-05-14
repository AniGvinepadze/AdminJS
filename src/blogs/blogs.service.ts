import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Blog } from './schema/blog.schema';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BlogsService {
  constructor(@InjectModel('blog') private readonly blogModel:Model<Blog>){}
 async create(createBlogDto: CreateBlogDto) {
    const blog = await this.blogModel.create(createBlogDto)
    if(!blog) throw new BadRequestException('blog could not be created')

    return blog
  }

  findAll() {
    return this.blogModel.find()
  }

  async findOne(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("Invalid id format is provided")
    const blog =  await this.blogModel.findById(id)
  if(!blog) throw new NotFoundException('Blog was not found')
    return blog
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    if(!isValidObjectId(id)) throw new BadRequestException("Invalid id format is provided")
    const updatedBlog = await  this.blogModel.findByIdAndUpdate(id,updateBlogDto,{new:true})
    if(!updatedBlog) throw new BadRequestException('Blog could not be updated') 
    return {message:"blog updated successfully" , updatedBlog}
  }

async  remove(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("Invalid id format is provided")
    const deletedBlog = await  this.blogModel.findByIdAndDelete(id)
    if(!deletedBlog) throw new BadRequestException('Blog could not be deleted') 
    return {message:"blog deleted successfully" , deletedBlog}
  }
}
