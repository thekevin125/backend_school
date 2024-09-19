import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './shemas/users.shema'; // Asegúrate de que el nombre del archivo sea 'schemas' en lugar de 'shemas'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRounds);
    const createdUser = new this.userModel({ ...createUserDto, password: hashedPassword });
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

  // El método findOne se usa ahora para buscar por email
  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
