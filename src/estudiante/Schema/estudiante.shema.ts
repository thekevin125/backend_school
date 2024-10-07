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

  @Prop({ type: [{ materia: String, nota: Number, observacion: String }], default: [] })
  notas: {
    materia: string;
    nota: number;
    observacion?: string;
  }[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
