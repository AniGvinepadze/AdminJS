import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { aboutUsSchema } from './schema/about-us.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'aboutUs', schema: aboutUsSchema }]),
    AwsS3Module
  ],
  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
