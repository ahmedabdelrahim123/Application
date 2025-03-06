import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid email or password');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
     
    const jwtSecret = crypto.randomBytes(32).toString('hex'); // Generate new secret dynamically

    console.log("jwtSecret",jwtSecret);
    const payload = { sub: user._id, email: user.email };
    console.log("payload",payload);
    const token = this.jwtService.sign(payload, { secret: jwtSecret });
    console.log("token",token);
    // Store the token securely in an HTTP-only cookie
    // res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    return { message: 'Login successful', token };
  }
}