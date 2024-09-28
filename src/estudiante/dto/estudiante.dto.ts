import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsString()
  parentId: string;
}
