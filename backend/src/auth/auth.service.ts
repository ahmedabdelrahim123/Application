import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
  
    // Compare the plain password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);  
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
  
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);
  
    return { access_token: token };
  }
  
}