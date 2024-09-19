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

    console.log('Required Roles:', requiredRoles); // Debugging line
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('User Role:', user.role); // Debugging line

    return requiredRoles.includes(user.role);
  }
}
