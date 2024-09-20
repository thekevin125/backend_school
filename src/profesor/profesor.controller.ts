import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { RoleGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../auth/auth.guard';
import { ProfesorService } from './profesor.service';
import { AgregarNotaDto } from './dto/agregar-nota.dto';

@Controller('profesor')
@UseGuards(AuthGuard, RoleGuard)
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post('agregar-nota')
  @Roles(Role.Profesor)
  async agregarNota(@Body() agregarNotaDto: AgregarNotaDto) {
    const nota = await this.profesorService.agregarNota(agregarNotaDto);
    return { message: 'Nota agregada exitosamente', nota };
  }
}
