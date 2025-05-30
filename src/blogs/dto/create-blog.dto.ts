import { IsNotEmpty, IsString } from "class-validator";


export class CreateBlogDto {
 
    @IsNotEmpty()
    @IsString()
    title:string
     
    @IsNotEmpty()
    @IsString()
    description:string
     
    @IsNotEmpty()
    @IsString()
    link:string

}
