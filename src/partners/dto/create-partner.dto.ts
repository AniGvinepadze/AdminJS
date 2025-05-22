import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsArray()
  @IsOptional()
  images?: string[];
}
