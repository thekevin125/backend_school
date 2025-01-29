import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWeeklyMenuDto {
  @IsArray()
  @IsNotEmpty()
  menu: DayMenu[];
}

// src/menu/dto/create-menu.dto.ts
export class DayMenu {
  @IsString()
  @IsNotEmpty()
  dia: string;

  @IsString()
  @IsNotEmpty()
  plato: string;

  @IsString()
  @IsNotEmpty() // Asegurando que descripcion sea obligatorio
  descripcion: string;

  
}

