import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.cookies?.token; // Get token from cookies

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    // Manually attach token to headers before calling super
    request.headers.authorization = `Bearer ${token}`;

    return super.canActivate(context);
  }
}
