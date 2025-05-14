import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Feedback {
  @Prop({ type: String })
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'admin', default: [] })
  admin: mongoose.Schema.Types.ObjectId[];
}
