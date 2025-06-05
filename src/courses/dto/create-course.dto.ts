import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  courseTitle: string;

  @IsString()
  @IsOptional()
  courseDuration: string;

  @IsString()
  @IsOptional()
  courseQuantity: string;

  @IsNumber()
  @IsOptional()
  coursePrice: string;

  @IsString()
  @IsOptional()
  courseGoal: string;

  @IsString()
  @IsOptional()
  CourseDestription: string;

  @IsString()
  @IsOptional()
  courseLittleGoals: string;

  @IsString()
  @IsOptional()
  courseSyllabus: string;
}
