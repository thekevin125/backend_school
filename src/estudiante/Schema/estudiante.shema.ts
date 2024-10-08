import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  grado: string;
  
  @Prop({ required: true })
telefono: string;

@Prop({ required: true })
direccion: string;


  @Prop({ type: [{ materia: String, nota: Number, observacion: String }], default: [] })
  notas: {
    materia: string;
    nota: number;
    observacion?: string;
  }[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
