import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @Length(6,20)
    password:string
}