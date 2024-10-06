import { IsOptional, IsString, IsMongoId } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @IsMongoId()
  estudianteId?: string;

  @IsOptional()
  @IsString()
  materia?: string;

  @IsOptional()
  @IsString()
  nota?: string;

  @IsOptional()
  @IsString()
  observacion?: string;
}
