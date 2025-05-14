import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true})
export class Admin {
    @Prop({type:String})
    fullName:string

    @Prop({type:String})
    email:string

    @Prop({type:String})
    password:string


}

export const adminSchema = SchemaFactory.createForClass(Admin) 
