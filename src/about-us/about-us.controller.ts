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
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { isAuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Post()
  @UseGuards(isAuthGuard)
  create(@Body() createAboutUsDto: CreateAboutUsDto) {
    return this.aboutUsService.create(createAboutUsDto);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    const path = Math.random().toString().slice(2);

    const type = file.mimetype.split('/')[1];
    const filePath = `images/${path}`;
    console.log(filePath, 'filepath');
    return this.aboutUsService.uploadImage(filePath, file.buffer);
  }
  @Post('getImage')
  getFileById(@Body('fileId') fileId) {
    return this.aboutUsService.getImage(fileId);
  }
  @Post('deleteImage')
  deleteImageById(@Body('fileId') fileId: string) {
    console.log('deleteImageById called with:', fileId);
    return this.aboutUsService.deleteImageById(fileId);
  }


  @Get()
  findAll() {
    return this.aboutUsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutUsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(isAuthGuard)
  update(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.update(id, updateAboutUsDto);
  }

  @Delete(':id')
  @UseGuards(isAuthGuard)
  remove(@Param('id') id: string) {
    return this.aboutUsService.remove(id);
  }
}
