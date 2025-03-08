import { Controller, Post,Get, Body, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post("signup")
  async signUp(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.createUser(body.name, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.authService.login(email, password);
  
    // Set the token in an HTTP-only cookie
    res.cookie('token', user.access_token, {
      httpOnly: true, // Prevents JavaScript access (more secure)
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
      sameSite: 'strict', // Prevent CSRF attacks (use 'lax' if you have cross-domain requests)
    });
    return res.json({ message: 'Login successful' }); // No need to return the token
  }

  @Get('logout')
 async logout(@Res() res: Response) {
  res.cookie('token', '', {
    httpOnly: true,
    maxAge: 0, // Immediately expires the cookie
    sameSite: 'strict',
  });

  return res.json({ message: 'Logout successful' });
}

  @UseGuards(JwtAuthGuard) // Protect the route
  @Get('protected')
  async protectedRoute(@Request() req) {
    return { message: 'Authenticated', user: req.user };
  }
}
