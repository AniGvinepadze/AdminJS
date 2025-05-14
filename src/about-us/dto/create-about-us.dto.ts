import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAboutUsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  img: string;
}
