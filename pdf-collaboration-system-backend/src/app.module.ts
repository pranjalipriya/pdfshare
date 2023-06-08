import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

  @Module({
    imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: 'your-secret-key', // Replace with your own secret key
        signOptions: { expiresIn: '1h' }, // Set the token expiration time
      }),
      ConfigModule.forRoot({ isGlobal: true }),
      MongooseModule.forRootAsync({
        useFactory: async () => {
          return {
            uri:'mongodb+srv://pranjalipriya03:pranjali03@cluster0.zat2vdx.mongodb.net/pdf',
          };
        },
      }),
 //AuthModule,
 UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
