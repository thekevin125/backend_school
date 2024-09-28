import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './estudiante.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
