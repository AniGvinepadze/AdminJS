import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  partnerDescription: string;
}
