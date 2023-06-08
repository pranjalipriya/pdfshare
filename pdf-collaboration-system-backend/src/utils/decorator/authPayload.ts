
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


export const AuthPayload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = authorizationHeader.substring(7);
      const jwtService = new JwtService({secret: 'abc'});
      const decodedToken = jwtService.decode(token);
      return decodedToken;
    }
  }
)
  // (data: unknown, context: ExecutionContext) => {
  //   const req= context.switchToHttp().getRequest();

  //   return req.user;
  // },
