import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { RoleGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../auth/auth.guard';

@Controller('profesor')
@UseGuards(AuthGuard, RoleGuard)
export class ProfesorController {
  
  @Post('agregar-notas')
  @Roles(Role.Profesor)
  async agregarNotas(@Body() body: { grade: string, notas: any }) {
    // Aquí va la lógica para agregar notas a los estudiantes por grado
    return { message: 'Notas agregadas exitosamente', body };
  }
}
