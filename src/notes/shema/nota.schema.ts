import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Nota extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Estudiante', required: true })
  estudianteId: Types.ObjectId; // Referencia al estudiante

  @Prop({ required: true })
  materia: string; // Materia

  @Prop({ required: true })
  nota: string; // Nota

  @Prop()
  observacion: string; // Observación opcional
}

export const NotaSchema = SchemaFactory.createForClass(Nota);
