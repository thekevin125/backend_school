import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import { Nota } from './shema/nota.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Promise<Nota> {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll(): Promise<Nota[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Nota> {
    return this.notesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto): Promise<Nota> {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.notesService.remove(id);
  }
}
