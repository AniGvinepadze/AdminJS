import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsNotEmpty()
  @IsString()
  img: string;
}
