import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

export class isAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = this.getTokenFromHeader(req.headers);

      if (!token) throw new BadRequestException('token is not provided');

      const payLoad = await this.jwtService.verify(token);
      req.adminId = payLoad.adminId;

      return true;
    } catch (error) {
      throw new UnauthorizedException('permission denied');
    }
  }
  getTokenFromHeader(headers) {
    const authorization = headers['authorization'];
    if (!authorization) return null;
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
