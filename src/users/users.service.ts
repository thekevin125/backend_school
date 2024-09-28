import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './shemas/users.shema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verifica que el password esté presente antes de hashear
    if (!createUserDto.password) {
      throw new Error('Password is required');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRounds);
    
    // Crear el nuevo usuario
    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
    
    // Guardar y devolver el usuario creado
    return createdUser.save();
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, this.saltRounds);
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
