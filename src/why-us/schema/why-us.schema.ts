import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class WhyUs {
  @Prop({ type: String })
  description: string;
}

export const whyUsSchema = SchemaFactory.createForClass(WhyUs);
