import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterStudentDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  grade: string;
}
