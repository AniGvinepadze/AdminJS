import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateAdminDto {
    @IsString()
    @IsNotEmpty()
    fullName:string

    @IsEmail()
    @IsNotEmpty()
    email:string

}

