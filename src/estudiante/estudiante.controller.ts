import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { RoleGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../auth/auth.guard';

@Controller('estudiante')
@UseGuards(AuthGuard, RoleGuard)
export class EstudianteController {
  
  @Get('ver-notas')
  @Roles(Role.Estudiante)
  async verNotas(@Request() req) {
    const user = req.user; // Esto asume que el usuario está autenticado y puedes obtener su información
    // Aquí va la lógica para que el estudiante vea sus notas
    return { notas: 'Estas son tus notas', user };
  }
}
