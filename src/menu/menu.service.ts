import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Menu, MenuDocument } from './shema/menu.schema';
import { CreateWeeklyMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private readonly menuModel: Model<MenuDocument>,
  ) {}

  // Crear el menú semanal
  async createWeeklyMenu(createWeeklyMenuDto: CreateWeeklyMenuDto): Promise<Menu[]> {
    return this.menuModel.insertMany(createWeeklyMenuDto.menu);
  }

  // Obtener todo el menú registrado
  async findAll(): Promise<Menu[]> {
    return this.menuModel.find().exec();
  }

  // Obtener el menú de un día específico
  async findByDay(dia: string): Promise<Menu | null> {
    return this.menuModel.findOne({ dia }).exec();
  }

  // Actualizar el menú de un día específico
  async updateMenu(dia: string, updateMenuDto: CreateWeeklyMenuDto): Promise<Menu> {
    const updatedMenu = await this.menuModel.findOneAndUpdate(
      { dia },
      { $set: updateMenuDto.menu[0] }, // Asumiendo que el DTO tiene un solo día
      { new: true }
    );
    if (!updatedMenu) {
      throw new NotFoundException(`Menu for ${dia} not found`);
    }
    return updatedMenu;
  }

  // Eliminar el menú de un día específico
  async deleteMenu(dia: string): Promise<any> {
    const deletedMenu = await this.menuModel.findOneAndDelete({ dia });
    if (!deletedMenu) {
      throw new NotFoundException(`Menu for ${dia} not found`);
    }
    return { message: `Menu for ${dia} deleted successfully` };
  }
}
