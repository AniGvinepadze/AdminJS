import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Feedback } from './schema/feedback.schema';
import { retry } from 'rxjs';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('feedback') private readonly feedbackModel: Model<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const feedback = await this.feedbackModel.create(createFeedbackDto);
    if (!feedback)
      throw new BadRequestException('feedback could not be cretaed');
    return feedback;
  }

  findAll() {
    return this.feedbackModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId)
      throw new BadRequestException('Invalid id is provided');
    const feedback = await this.feedbackModel.findById(id);
    if (!feedback) throw new NotFoundException('feedback was not found');
    return feedback;
  }

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    if (!isValidObjectId)
      throw new BadRequestException('Invalid id is provided');
    const updatedFeedback = await this.feedbackModel.findByIdAndUpdate(
      id,
      updateFeedbackDto,
      { new: true },
    );
    if (!updatedFeedback)
      throw new BadRequestException('feedback could not be updated');
    return { message: 'feedback updated successfully', updatedFeedback };
  }

 async remove(id: string) {
    if (!isValidObjectId)
      throw new BadRequestException('Invalid id is provided');
    const deletedFeedback = await this.feedbackModel.findByIdAndDelete(id)
    if(!deletedFeedback) throw new BadRequestException('feedback could not be deleeted')
    return { message: 'feedback deleted successfully', deletedFeedback };
  }
}
