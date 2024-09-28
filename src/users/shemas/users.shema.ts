import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../enums/roles.enum'; // Ajusta la ruta si es necesario

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: Role })
  role: Role;



  // Agrega un ID si no está presente
  _id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

