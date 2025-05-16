import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { imageSchema } from './schema/image.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { courseSchema } from 'src/courses/schema/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'image', schema: imageSchema }]),
    MongooseModule.forFeature([{ name: 'course', schema: courseSchema }]),
    AwsS3Module,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, AwsS3Service],
  exports: [ImagesService],
})
export class ImagesModule {}
