import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from '../auth/auth.guard'; // Importa tu guard de autenticación JWT
import { RoleGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../enums/roles.enum';

@Controller('notes')
@UseGuards(AuthGuard, RoleGuard) // Usa ambos guards: autenticación y roles
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @Roles(Role.Profesor)
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @Roles(Role.Profesor)
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Profesor)
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Profesor)
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @Roles(Role.Profesor)
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
