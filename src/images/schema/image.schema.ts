import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Image {
  @Prop({ required: true })
  s3Key: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;
@Prop({
  type: Types.ObjectId,
  ref: 'course',
})
course: Types.ObjectId;

@Prop({
  type: Types.ObjectId,
  ref: 'partner',
})
partner: Types.ObjectId;
}

export const imageSchema = SchemaFactory.createForClass(Image);
