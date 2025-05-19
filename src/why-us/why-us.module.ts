import { Module } from '@nestjs/common';
import { WhyUsService } from './why-us.service';
import { WhyUsController } from './why-us.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { whyUsSchema } from './schema/why-us.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'why-us', schema: whyUsSchema }]),
  ],
  controllers: [WhyUsController],
  providers: [WhyUsService],
})
export class WhyUsModule {}
