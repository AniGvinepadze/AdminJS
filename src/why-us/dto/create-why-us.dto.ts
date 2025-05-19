import { IsNotEmpty, IsString } from "class-validator";


export class CreateWhyUsDto {
    @IsNotEmpty()
    @IsString()
    description:string
}
