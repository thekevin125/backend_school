import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateWeeklyMenuDto } from './dto/create-menu.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { RoleGuard } from '../common/guards/roles.guard'; 

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Endpoint para registrar el menú de toda la semana
  @Post('/semanal')
  @UseGuards(AuthGuard, RoleGuard )
  @Roles(Role.Profesor) // Solo los profesores puerden agregar el menú de la semana
  createWeeklyMenu(@Body() createWeeklyMenuDto: CreateWeeklyMenuDto) {
    return this.menuService.createWeeklyMenu(createWeeklyMenuDto);
  }

  // Obtener todo el menú registrado
  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  // Obtener menú de un día específico (Lunes, Martes, etc.)
  @Get(':dia')
  findByDay(@Param('dia') dia: string) {
    return this.menuService.findByDay(dia);
  }
}
