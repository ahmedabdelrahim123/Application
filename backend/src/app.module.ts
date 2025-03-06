import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI as string), // Use .env variable
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}