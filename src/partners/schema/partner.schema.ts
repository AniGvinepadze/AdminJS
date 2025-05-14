import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Partner {
  @Prop({ type: String })
  img: string;
}

export const partnerSchema = SchemaFactory.createForClass(Partner);
