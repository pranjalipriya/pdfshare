import { Controller, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../utils/multer.options';
import { MulterModule } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC } from '../utils/decorator/isPublic';
import { AuthPayload } from '../utils/decorator/authPayload';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @IS_PUBLIC()
  @Post('signup')
   async signup(@Body('name') name: string,@Body('email') email: string, @Body('password') password: string) {
   try{
    return await this.userService.signUp({name,email,password});
  }
  catch(e){
    console.log(e)
  }
}

  @IS_PUBLIC()
  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
   return await this.userService.login({email,password})
}


 
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @AuthPayload()  req: any
  ) {
    console.log(req)
   return this.userService.upload(req.userId,file);
  }
}

