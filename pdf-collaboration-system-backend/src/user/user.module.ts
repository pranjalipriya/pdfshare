import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';
import { UserSchema } from './entities/user.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),JwtModule],
  controllers: [UserController],
  providers: [UserService,UserRepository,JwtService],
  exports: [UserRepository], 
})
export class UserModule {}
