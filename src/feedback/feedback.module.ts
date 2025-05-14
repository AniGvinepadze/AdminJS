import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { feedbackSchema } from './schema/feedback.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:"feedback",schema:feedbackSchema}])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
