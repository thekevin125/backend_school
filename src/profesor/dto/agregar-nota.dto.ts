import { IsString, IsNumber } from 'class-validator';

export class AgregarNotaDto {
  @IsString()
  studentId: string; // ID del estudiante

  @IsString()
  grade: string; // Grado del estudiante

  @IsString()
  subject: string; // Asignatura

  @IsNumber()
  score: number; // Calificación
}
