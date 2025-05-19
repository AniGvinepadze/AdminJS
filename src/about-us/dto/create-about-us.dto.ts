import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAboutUsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
  
  @IsArray()
  @IsOptional()
  images?: string[];
  
}
