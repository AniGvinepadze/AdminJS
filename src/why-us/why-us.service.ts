import { Injectable } from '@nestjs/common';
import { CreateWhyUsDto } from './dto/create-why-us.dto';
import { UpdateWhyUsDto } from './dto/update-why-us.dto';

@Injectable()
export class WhyUsService {
  create(createWhyUsDto: CreateWhyUsDto) {
    return 'This action adds a new whyUs';
  }

  findAll() {
    return `This action returns all whyUs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whyUs`;
  }

  update(id: number, updateWhyUsDto: UpdateWhyUsDto) {
    return `This action updates a #${id} whyUs`;
  }

  remove(id: number) {
    return `This action removes a #${id} whyUs`;
  }
}
