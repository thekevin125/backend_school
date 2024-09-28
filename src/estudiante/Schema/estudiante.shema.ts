import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  grade: string;

  @Prop({ type: [Number], default: [] }) // Asegúrate de que grades sea un arreglo de números
  grades: number[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
