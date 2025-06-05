import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course {
  @Prop({ type: String })
  name: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  courseTitle: string;

  @Prop({ type: String })
  courseDuration: string;

  @Prop({ type: String })
  courseQuantity: string;

  @Prop({ type: String })
  coursePrice: string;

  @Prop({ type: String })
  courseGoal: string;

  @Prop({ type: String })
  CourseDestription: string;

  @Prop({ type: String })
  courseLittleGoals: string;

  @Prop({ type: String })
  courseSyllabus: string;

}

export const courseSchema = SchemaFactory.createForClass(Course);
