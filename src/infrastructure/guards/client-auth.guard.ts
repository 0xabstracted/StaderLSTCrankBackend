// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { EnvironmentConfigService } from 'src/infrastructure';

// @Injectable()
// export class ClientAuthGuard implements CanActivate {
//   constructor(
//     private readonly environmentConfigService: EnvironmentConfigService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<any> {
//     try {
//       const request = context.switchToHttp().getRequest();
//       const apiKey = this.environmentConfigService.getClientAPIKey();
//       const clientId = this.environmentConfigService.getClientID();
//       const telegramToken = this.environmentConfigService.getTelgramApiToken();

//       // Extract api-key and client-id from headers
//       const reqApiKey = request.headers['x-api-key'];
//       const reqClientId = request.headers['x-client-id'];
//       const reqInitData = request.headers['init-data'];

//       if (reqApiKey !== apiKey || reqClientId !== clientId) {
//         throw new HttpException(
//           'Invalid API-KEY or CLIENT-ID',
//           HttpStatus.UNAUTHORIZED,
//         );
//       } else {
//         const crypto = require('crypto');

//         // const telegramInitData =
//         //   'query_id=AAFbvjssAgAAAFu-OyxjykDv&user=%7B%22id%22%3A5037080155%2C%22first_name%22%3A%22Govind%22%2C%22last_name%22%3A%22Arora%22%2C%22username%22%3A%22govindaroraaa%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1722946722&hash=734eaf7d851eadf3ee4e6e2d7c0dd0ce499755d86bd9da1542d51a96f85102e0';

//         const initData = new URLSearchParams(reqInitData);


//         const hash = initData.get('hash');
//         initData.delete('hash');

//         const dataToCheck = [...initData.entries()]
//           .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
//           .sort()
//           .join('\n');

//         const secretKey = crypto
//           .createHmac('sha256', 'WebAppData')
//           .update(telegramToken)
//           .digest();
//         const computedHash = crypto
//           .createHmac('sha256', secretKey)
//           .update(dataToCheck)
//           .digest('hex');

//         return computedHash === hash;
//       }
//     } catch (error) {
//       throw new HttpException(
//         'Invalid API-KEY or CLIENT-ID',
//         HttpStatus.UNAUTHORIZED,
//       );
//     }
//   }
// }
