import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { courseSchema } from './schema/course.schema';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'course', schema: courseSchema }]),
    AwsS3Module,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
