import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Teacher extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; // Para el inicio de sesión

  @Prop({ required: true })
  subject: string; // Materia que enseña
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
