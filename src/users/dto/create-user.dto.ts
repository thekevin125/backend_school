import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Role } from '../../enums/roles.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: Role;


}