import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Teacher extends Document {
  @Prop({ required: true })
  nombre: string; // Nombre del profesor

  @Prop({ required: true, unique: true })
  email: string; // Email del profesor

  @Prop({ required: true })
  password: string; // Contraseña para el inicio de sesión

  @Prop({ required: true })
  materia: string; // Materia que enseña el profesor

  @Prop({ required: true })
  titulos: string; // Títulos académicos del profesor
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
