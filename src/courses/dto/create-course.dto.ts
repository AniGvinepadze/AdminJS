import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  category: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  courseTitle: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  courseDuration: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  courseQuantity: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  coursePrice: string;
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  courseGoal: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  CourseDestription: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  courseLittleGoals: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  courseSyllabus: string;

}
