import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  // Asegúrate de que el campo _id esté disponible
  _id: string; // Mongoose lo maneja automáticamente, pero puedes añadir esta línea para evitar errores de TypeScript
}

export const UserSchema = SchemaFactory.createForClass(User);
