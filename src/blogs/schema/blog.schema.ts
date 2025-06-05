import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Blog {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({type:String})
  images:string[]
}

export const blogSchema = SchemaFactory.createForClass(Blog)