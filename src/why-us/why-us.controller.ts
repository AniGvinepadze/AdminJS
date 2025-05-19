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
import { WhyUsService } from './why-us.service';
import { CreateWhyUsDto } from './dto/create-why-us.dto';
import { UpdateWhyUsDto } from './dto/update-why-us.dto';
import { isAuthGuard } from 'src/guards/auth.guard';

@Controller('why-us')
@UseGuards(isAuthGuard)
export class WhyUsController {
  constructor(private readonly whyUsService: WhyUsService) {}

  @Post()
  create(@Body() createWhyUsDto: CreateWhyUsDto) {
    return this.whyUsService.create(createWhyUsDto);
  }

  @Get()
  findAll() {
    return this.whyUsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whyUsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhyUsDto: UpdateWhyUsDto) {
    return this.whyUsService.update(id, updateWhyUsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whyUsService.remove(id);
  }
}
