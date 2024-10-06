import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  nombre?: string; // Actualiza el nombre

  @IsOptional()
  @IsEmail()
  email?: string; // Actualiza el email

  @IsOptional()
  @IsString()
  materia?: string; // Permitir la actualización de la materia

  @IsOptional()
  @IsString()
  titulos?: string; // Permitir la actualización de los títulos académicos

  @IsOptional()
  @IsString()
  password?: string; // Permitir la actualización de la contraseña
}
