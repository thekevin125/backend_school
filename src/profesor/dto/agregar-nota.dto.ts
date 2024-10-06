import { IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  materia: string; // Materia que enseña el profesor

  @IsNotEmpty()
  titulos: string; // Títulos académicos del profesor

  @IsNotEmpty()
  password: string; // Contraseña del profesor
}
