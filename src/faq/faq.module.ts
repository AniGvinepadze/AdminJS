import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { FaqController } from './faq.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { faqSchema } from './schema/faq.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'faq', schema: faqSchema }])],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
