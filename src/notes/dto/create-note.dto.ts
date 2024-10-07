import { IsNotEmpty, IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsMongoId()
  estudiante: string;

  @IsNotEmpty()
  @IsString()
  materia: string;

  @IsNotEmpty()
  @IsString()
  observacion: string;

  @IsNotEmpty()
  @IsNumber()
  nota: number;
}
