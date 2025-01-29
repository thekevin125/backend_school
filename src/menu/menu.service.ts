import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './shema/menu.schema';
import { CreateWeeklyMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu.name) private menuModel: Model<MenuDocument>) {}

  // Crear el menú de la semana (lunes a viernes)
  async createWeeklyMenu(createWeeklyMenuDto: CreateWeeklyMenuDto): Promise<Menu[]> {
    return this.menuModel.insertMany(createWeeklyMenuDto.menu);
  }

  // Obtener todos los menús de la base de datos
  async findAll(): Promise<Menu[]> {
    return this.menuModel.find().exec();
  }

  // Obtener menú por día (lunes, martes, etc.)
  async findByDay(dia: string): Promise<Menu[]> {
    return this.menuModel.find({ dia }).exec();
  }
}
