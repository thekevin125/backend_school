import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../enums/roles.enum';
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: Role;

  @IsOptional()
  @IsString()
  grade?: string;
}