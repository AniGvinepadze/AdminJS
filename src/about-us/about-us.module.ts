import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { aboutUsSchema } from './schema/about-us.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'aboutUs', schema: aboutUsSchema }]),
  ],
  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
