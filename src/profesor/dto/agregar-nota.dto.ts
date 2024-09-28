import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string; // Añadir contraseña
}
