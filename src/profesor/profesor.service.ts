import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nota, NotaDocument } from './shemas/nota.schema';
import { AgregarNotaDto } from './dto/agregar-nota.dto';

@Injectable()
export class ProfesorService {
  constructor(@InjectModel(Nota.name) private notaModel: Model<NotaDocument>) {}

  async agregarNota(agregarNotaDto: AgregarNotaDto): Promise<Nota> {
    const nuevaNota = new this.notaModel(agregarNotaDto);
    return nuevaNota.save();
  }
}
