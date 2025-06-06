import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Feedback {
  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  author: string;

  @Prop({ type: String })
  category: string;
}

export const feedbackSchema = SchemaFactory.createForClass(Feedback);
