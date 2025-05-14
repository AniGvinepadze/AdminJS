import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Faq {
  @Prop({ type: String })
  question: string;

  @Prop({ type: String })
  answer: string;
}

export const faqSchema = SchemaFactory.createForClass(Faq)