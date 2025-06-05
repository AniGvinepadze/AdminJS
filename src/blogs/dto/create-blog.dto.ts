import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsOptional()
  @IsString()
  blogDescription: string;
}
