import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { isAuthGuard } from 'src/guards/auth.guard';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  @Post()
  @UseGuards(isAuthGuard)
  create(@Body() createAboutUsDto: CreateAboutUsDto) {
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
