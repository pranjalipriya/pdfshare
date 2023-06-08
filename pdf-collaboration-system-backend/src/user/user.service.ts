import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as filestack from 'filestack-js';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
constructor(
private userRepo: UserRepository,
private jwtService: JwtService,
) {}

private filestackClient = filestack.init('AW2m686GSR2onUGa5PJGGz');

findAll() {
return this.userRepo.getAll();
}

async upload( id:string,file: any) {
const response = await this.filestackClient.upload(file.path);
const fileUrl = response.url;
this.userRepo.savePdfLink( id,fileUrl);
return {
fileUrl,
};
}


async login(data: any) {
  const user = await this.validateUser(data);
  if (!user) {
    throw new UnauthorizedException();
  }
  const payload = { email: user.email, userId: user.userId };
  return {
    ...user,
    access_token: this.jwtService.sign(payload, {
      secret: 'abc',
    }),
  };
}
async validateUser(data:any) {
  const user = await this.userRepo.getUserByEmail(data.email);
  if (user && (await bcrypt.compare(data.password, user.password))) {
    return user;
  }
  return undefined;
}


async signUp(createUserDto: CreateUserDto) {
  const user = await this.userRepo.getUserByEmail(createUserDto.email);
  if (user) {
  return false
  }
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(
    createUserDto.password,
    saltOrRounds,
  );
 const email=createUserDto.email;
 const name=createUserDto.name
  return await this.userRepo.createUser({
    name,
    email,
    password: hashedPassword,
    userId: uuid(),
  });
}
}