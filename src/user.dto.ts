import { Exclude } from 'class-transformer';
import { createHash } from 'crypto';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export function hash(str: string) {
  const encrypt = createHash('sha256');
  encrypt.update(str);
  return encrypt.digest('hex');
}

export const users: Array<User> = [
  { username: 'admin', password: hash('123456'), role: 'admin' },
  { username: 'vip', password: hash('123456'), role: 'vip' },
  { username: 'student', password: hash('123456'), role: 'student' },
];

export class User {
  username: string
  
  @Exclude()
  password: string
  role: string
}

export class LoginDto {
  username: string
  password: string
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private async validateRequest(request: Request) {
    const token = request.headers['authorization'];
    if (token) {
      const parts = token.split(' ');
      if (parts.length === 2 || parts[0] === 'Bearer') {
        //Bearer token 是有效的
        const secret = this.configService.get<string>('JWT_SECRET');
        try {
          const data = verify(parts[1], secret) as IUser;
          request.user = data;
        } catch {
          
        }
      }
    }
    return true;
  }

}

@Injectable()
export class AuthorizationGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    const user: User = (request as any).user;
    if(roles?.length && !user) throw new UnauthorizedException();
    if (roles?.length && !roles.includes(user?.role))
      throw new UnauthorizedException();
    return true;
  }
}