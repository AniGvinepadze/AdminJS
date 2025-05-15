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
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { isAuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(isAuthGuard)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    const path = Math.random().toString().slice(2);

    const type = file.mimetype.split('/')[1];
    const filePath = `images/${path}`;
    console.log(filePath, 'filepath');
    return this.coursesService.uploadImage(filePath, file.buffer);
  }
  @Post('getImage')
  getFileById(@Body('fileId') fileId) {
    return this.coursesService.getImage(fileId);
  }
  @Post('deleteImage')
  deleteImageById(@Body('fileId') fileId: string) {
    console.log('deleteImageById called with:', fileId);
    return this.coursesService.deleteImageById(fileId);
  }
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(isAuthGuard)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(isAuthGuard)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
