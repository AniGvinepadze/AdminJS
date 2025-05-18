import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { isAuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
@UseGuards(isAuthGuard)
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('img'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('courseId') courseId?: string,
    @Body('partnerId') partnerId?: string,
  ) {
    const path = Math.random().toString().slice(2);
    const filePath = `images/${path}`;
    return this.imagesService.uploadImage(filePath, file,courseId, partnerId);
  }

  @Post('getImage')
  getFileById(@Body('fileId') fileId: string) {
    return this.imagesService.getImage(fileId);
  }

  @Post('deleteImage')
  deleteImageById(@Body('fileId') fileId: string) {
    return this.imagesService.deleteImageById(fileId);
  }
}
