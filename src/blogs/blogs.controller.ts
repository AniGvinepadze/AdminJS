import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { isAuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(isAuthGuard)
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('shemovida');
    const mimetype = file?.mimetype.split('/')[1];
    console.log(mimetype, 'mimetype');
    const filePath = `images/${v4()}.${mimetype}`;
    const imageUrl = await this.blogsService.uploadImage(
      filePath,
      file?.buffer,
    );

    if (!imageUrl) {
      throw new BadRequestException('Image upload failed');
    }

    createBlogDto.images = [imageUrl];
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(isAuthGuard)
    @UseInterceptors(FileInterceptor('img'))
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto,@UploadedFile() file:Express.Multer.File) {
    return this.blogsService.update(id, updateBlogDto,file);
  }

  @Delete(':id')
  @UseGuards(isAuthGuard)
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
