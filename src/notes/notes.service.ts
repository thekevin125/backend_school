import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Nota } from './shema/nota.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Nota.name) private notaModel: Model<Nota>) {}

  async create(createNoteDto: CreateNoteDto): Promise<Nota> {
    const nuevaNota = new this.notaModel(createNoteDto);
    return nuevaNota.save();
  }

  async findAll(): Promise<Nota[]> {
    return this.notaModel.find().populate('estudianteId').exec();
  }

  async findOne(id: string): Promise<Nota> {
    return this.notaModel.findById(id).populate('estudianteId').exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Nota> {
    return this.notaModel.findByIdAndUpdate(id, updateNoteDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.notaModel.findByIdAndDelete(id).exec();
  }
}
