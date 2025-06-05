import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Partner {
  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({type:String})
  description:string

  @Prop({type:String})
  partnerDescription
  
}

export const partnerSchema = SchemaFactory.createForClass(Partner);
