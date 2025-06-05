import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
  @Prop({ type: String })
  name: string;

  @Prop({ type: [String], default: [] })
  images: string[];
  
  

  @Prop({ type: String })
  category: string;
}

export const courseSchema = SchemaFactory.createForClass(Course);
