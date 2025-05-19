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
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { isAuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 } from 'uuid';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Post()
  @UseGuards(isAuthGuard)
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() createAboutUsDto: CreateAboutUsDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log("shemovida")
    const mimetype = file?.mimetype.split('/')[1];
    console.log(mimetype, 'mimetype');
    const filePath = `images/${v4()}.${mimetype}`;
    const imageUrl = await this.aboutUsService.uploadImage(
      filePath,
      file?.buffer,
    );

    if (!imageUrl) {
      throw new BadRequestException('Image upload failed');
    }

    createAboutUsDto.images = [imageUrl];
    return this.aboutUsService.create(createAboutUsDto);
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
