import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    // Aquí puedes buscar al usuario en tu base de datos si es necesario
    return { userId: payload.sub, username: payload.username };
  }
}
