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
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { isAuthGuard } from 'src/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { v4 } from 'uuid';

@Controller('partners')
@UseGuards(isAuthGuard)
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async create(
    @Body() createPartnerDto: CreatePartnerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const mimetype = file.mimetype.split('/')[1];
    const filePath = `images/${v4()}.${mimetype}`;
    const imageUrl = await this.partnersService.uploadImage(
      filePath,
      file.buffer,
    );

    if (!imageUrl) {
      throw new BadRequestException('Image upload failed');
    }
    createPartnerDto.images = [imageUrl];
    return this.partnersService.create(createPartnerDto);
  }
  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    const path = Math.random().toString().slice(2);

    const type = file.mimetype.split('/')[1];
    const filePath = `images/${path}`;
    console.log(filePath, 'filepath');
    return this.partnersService.uploadImage(filePath, file.buffer);
  }
  @Post('getImage')
  getFileById(@Body('fileId') fileId) {
    return this.partnersService.getImage(fileId);
  }
  @Post('deleteImage')
  deleteImageById(@Body('fileId') fileId: string) {
    console.log('deleteImageById called with:', fileId);
    return this.partnersService.deleteImageById(fileId);
  }

  @Get()
  findAll() {
    return this.partnersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('img'))
  update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.partnersService.update(id, updatePartnerDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
