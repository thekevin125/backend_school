import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../enums/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required Roles:', requiredRoles); // Ver qué roles se requieren

    if (!requiredRoles) {
      return true; // Si no hay roles requeridos, permitir acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Aquí obtenemos el usuario del request

    if (!user) {
      console.log('No user found in request'); // Mensaje de depuración
      return false; // No hay usuario, no se permite el acceso
    }

    console.log('User Role:', user.role); // Ver qué rol tiene el usuario

    return requiredRoles.some(role => user.role === role); // Verifica si el rol del usuario está en los roles requeridos
  }
}
