import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Feedback {
  @Prop({ type: String })
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] })
  user: mongoose.Schema.Types.ObjectId[];
}

export const feedbackSchema = SchemaFactory.createForClass(Feedback);
