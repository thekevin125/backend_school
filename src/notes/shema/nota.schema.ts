import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class Nota extends Document {
  @Prop({ required: true, type: String })
  estudiante: string;

  @Prop({ required: true, type: String })
  materia: string;

  @Prop({ required: true, type: Number })
  nota: number;

  @Prop({ required: false, type: String })
  observacion: string;
}

export const NotaSchema = SchemaFactory.createForClass(Nota);

