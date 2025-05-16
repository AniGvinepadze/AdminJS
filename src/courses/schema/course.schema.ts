import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
  @Prop({ type: String })
  name: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Image', default: [] })
  images: Types.ObjectId[];
  
  @Prop({ type: String })
  link: string;

  @Prop({ type: String })
  category: string;
}

export const courseSchema = SchemaFactory.createForClass(Course);
