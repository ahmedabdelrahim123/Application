import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '727592d739ce5d4aa22700c9373384f625503ded3e85e7598dac3bb73400654d',
    });

  }

  async validate(payload: any) {
    console.log('Decoded JWT Payload:', payload);
    return { userId: payload.sub, email: payload.email };
  }
}
