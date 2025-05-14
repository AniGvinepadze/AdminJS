import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

Schema({timestamps:true})
export class Course {
    @Prop({type:String})
    name:string
    
    @Prop({type:String})
    img:string

    @Prop({type:String})
    link:string

    @Prop({type:String})
    category:string
}


export const courseSchema = SchemaFactory.createForClass(Course)