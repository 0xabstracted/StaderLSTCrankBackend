import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EnvironmentConfigService } from 'src/infrastructure';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const apiKey = this.environmentConfigService.getAdminAPIKey();
      const clientId = this.environmentConfigService.getAdminID();

      // Extract api-key and client-id from headers
      const reqApiKey = request.headers['x-admin-api-key'];
      const reqClientId = request.headers['x-admin-id'];
      return reqApiKey === apiKey && reqClientId === clientId;
    } catch (error) {
      throw new HttpException(
        'Invalid API-KEY or CLIENT-ID',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
