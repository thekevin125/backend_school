import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto'; // Asegúrate de que la ruta sea correcta
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto.email, authDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
