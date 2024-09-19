import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    // Busca al usuario por email
    const user = await this.usersService.findOneByEmail(email);

    // Verifica si el usuario existe y si la contraseña es válida
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(pass, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Crea el payload del JWT
    const payload = { sub: user._id.toString(), username: user.name };

    // Genera y devuelve el token de acceso
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
