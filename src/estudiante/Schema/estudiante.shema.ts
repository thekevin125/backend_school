import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Estudiante extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  grade: string;  // El grado al que pertenece el estudiante
}

export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);
