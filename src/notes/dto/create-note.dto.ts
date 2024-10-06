import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsMongoId()
  estudianteId: string; // El ID del estudiante

  @IsNotEmpty()
  @IsString()
  materia: string; // Materia en la que se evalúa al estudiante

  @IsNotEmpty()
  @IsString()
  nota: string; // Nota obtenida por el estudiante

  @IsString()
  observacion: string; // Observación sobre el rendimiento del estudiante
}
