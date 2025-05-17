// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { AuthService } from 'src/auth/auth.service';
// import { Observable } from 'rxjs';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private readonly authService: AuthService) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     try {
//       const authHeader = request.headers.authorization;
//       if (!authHeader) {
//         throw new HttpException(
//           'No authorization header provided',
//           HttpStatus.UNAUTHORIZED,
//         );
//       }
//       const bearerToken = authHeader.split(' ')[1];
//       if (!bearerToken) {
//         throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
//       }
//       const user = this.authService.validateJWT(bearerToken);
//       if (user) {
//         request.userEmail = user.email_address;
//         request.userId = user.id;
//         return true;
//       }
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
//     }
//   }
// }
