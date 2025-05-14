import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Faq } from './schema/faq.schema';


@Injectable()
export class FaqService {
  constructor(@InjectModel('faq') private readonly faqModel: Model<Faq>) {}

  async create(createFaqDto: CreateFaqDto) {
    const faq = await this.faqModel.create(createFaqDto);
    if (!faq) throw new BadRequestException('FAQ could not be created');

    return faq;
  }

  findAll() {
    return this.faqModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');

    const faq = await this.faqModel.findById(id);
    if (!faq) throw new NotFoundException('FAQ was not found');
    return faq;
  }

  async update(id: string, updateFaqDto: UpdateFaqDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');
    const updatedFaq = await this.faqModel.findByIdAndUpdate(id, updateFaqDto, {
      new: true,
    });
    if (!updatedFaq) throw new BadRequestException('FAQ could not be updated');
    return { message: 'FAQ updated successfully', updatedFaq };
  }

 async remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id format is provided');
    const deletedFaq = await this.faqModel.findByIdAndDelete(id);
    if (!deletedFaq)
      throw new BadRequestException('FAQ could not be deleted');
    return { message: 'FAQ deleted successfully', deletedFaq };
  }
}
