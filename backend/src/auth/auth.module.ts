import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService  } from '@nestjs/config'; // ✅ Import ConfigModule
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    ConfigModule.forRoot(), // to load environment variables
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '727592d739ce5d4aa22700c9373384f625503ded3e85e7598dac3bb73400654d',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
