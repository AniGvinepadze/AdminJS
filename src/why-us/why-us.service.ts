import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWhyUsDto } from './dto/create-why-us.dto';
import { UpdateWhyUsDto } from './dto/update-why-us.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { WhyUs } from './schema/why-us.schema';
import { PassThrough } from 'stream';

@Injectable()

export class WhyUsService {
  constructor(
    @InjectModel('why-us') private readonly whyusModel: Model<WhyUs>,
  ) {}
  async create(createWhyUsDto: CreateWhyUsDto) {
    const whyUs = await this.whyusModel.create(createWhyUsDto);
    if (!whyUs) throw new BadRequestException('why-us xould not be created');
    return whyUs;
  }

  findAll() {
    return this.whyusModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('invalid id format is provided');
    const whyUs = await this.whyusModel.findById(id);
    if (!whyUs) throw new NotFoundException('why- us coul not be found');
    return whyUs;
  }

  async update(id: string, updateWhyUsDto: UpdateWhyUsDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException('invalid id format is provided');
    const updatedWhyUs = await this.whyusModel.findByIdAndUpdate(
      id,
      updateWhyUsDto,
      { new: true },
    );
    if (!updatedWhyUs)
      throw new BadRequestException('why us could not be updated');
    return { message: 'why us updated succesffully', updatedWhyUs };
  }

  async remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('invalid id format is provided');

    const deleetedWhyUs = await this.whyusModel.findByIdAndDelete(id);
    if (!deleetedWhyUs)
      throw new BadRequestException('why us could not be deleted');
    return { message: 'why us updated succesffully', deleetedWhyUs };
  }
}
