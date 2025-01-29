import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Menu {
  @Prop({ required: true })
  dia: string; // Día de la semana (Lunes, Martes, etc.)

  @Prop({ required: true })
  plato: string; // Nombre del plato

  @Prop({ required: false })
  descripcion: string; // Descripción del plato (opcional)

  
}

export type MenuDocument = Menu & Document;
export const MenuSchema = SchemaFactory.createForClass(Menu);
