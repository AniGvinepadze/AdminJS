import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AboutUs {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  img: string;
}

export const aboutUsSchema = SchemaFactory.createForClass(AboutUs);
