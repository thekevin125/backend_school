import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'; // Importar los decoradores de Swagger
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto'; // Asegúrate de que la ruta sea correcta
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('Auth') // Etiqueta para agrupar los endpoints de autenticación
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' }) // Descripción de la operación
  @ApiBody({ description: 'Credenciales de autenticación', type: AuthDto }) // Detalle de lo que se espera en el cuerpo de la solicitud
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso', type: String }) // Respuesta exitosa con el token JWT
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' }) // Respuesta para credenciales incorrectas
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto.email, authDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' }) // Descripción de la operación
  @ApiResponse({ status: 200, description: 'Perfil del usuario', type: Object }) // Respuesta con los datos del usuario
  async getProfile(@Request() req) {
    return req.user;
  }
}
