import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/shemas/users.shema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user || user.password !== pass) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user._id.toString(), username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


