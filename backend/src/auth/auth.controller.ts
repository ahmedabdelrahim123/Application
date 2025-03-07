import { Controller, Post, Body, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.createUser(body.name, body.email, body.password);
  }

  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body.email, req.body.password);
  }

  @UseGuards(JwtAuthGuard) //  Protect the route
  @Post('protected')
  async protectedRoute(@Request() req) {
    return { message: 'This is a protected route' };
  }
}
