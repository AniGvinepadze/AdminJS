import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Course } from './schema/course.schema';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Injectable()
export class CoursesService {
  constructor(@InjectModel('course') private courseModel: Model<Course>,   private s3Service: AwsS3Service,) {}

  async create(createCourseDto: CreateCourseDto) {
    console.log(createCourseDto, 'create');
    const course = await this.courseModel.create(createCourseDto);
    console.log(course);
    return course;
  }

  uploadImage(filePath, file) {
    return this.s3Service.uploadFile(filePath, file);
  }

  getImage(fileId){
    return this.s3Service.getImageById(fileId)
  }
  deleteImageById(fileId){
    return this.s3Service.deleteImageById(fileId)
  }
  findAll() {
    return this.courseModel.find();
  }

  async findOne(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id is provided');

    const course = await this.courseModel.findById(id);
    if (!course) throw new NotFoundException('course was not found');

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id is provided');

    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      {
        new: true,
      },
    );

    if (!updatedCourse)
      throw new BadRequestException('course could not be updated');

    return { message: 'course updated successfully', updatedCourse };
  }

  async remove(id: string) {
    if (!isValidObjectId(id))
      throw new BadRequestException('Invalid id is provided');
    const deletedCourse = await this.courseModel.findByIdAndDelete(id);
    if (!deletedCourse)
      throw new BadRequestException('course could not be deleted');

    return { message: 'course deleted successfully', deletedCourse };
  }
}
