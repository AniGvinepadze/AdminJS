import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class isAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.getTokenFromHeader(request.headers);
      console.log(token, 'token');

      if (!token) throw new BadRequestException('token is not provided');

      const payLoad = await this.jwtService.verify(token);
      console.log(payLoad, 'payload');
      request.adminId = payLoad.adminId;

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
