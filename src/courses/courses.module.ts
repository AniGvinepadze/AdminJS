import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { courseSchema } from './schema/course.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{name:"course",schema:courseSchema}])
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
