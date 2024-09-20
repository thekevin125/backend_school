import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Nota extends Document {
  @Prop({ required: true })
  studentId: string; // ID del estudiante

  @Prop({ required: true })
  grade: string; // Grado del estudiante

  @Prop({ required: true })
  subject: string; // Asignatura

  @Prop({ required: true })
  score: number; // Calificación
}

export const NotaSchema = SchemaFactory.createForClass(Nota);
export type NotaDocument = Nota & Document; // Asegúrate de exportar NotaDocument
