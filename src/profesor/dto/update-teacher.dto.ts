import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string; // Permitir la actualización de la contraseña
}
