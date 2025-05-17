import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private readonly configService: ConfigService) {}

  getAdminAPIKey() {
    return this.configService.get<string>('ADMIN_API_KEY');
  }

  getAdminID() {
    return this.configService.get<string>('ADMINID');
  }

  getDbConnectionUrl() {
    return this.configService.get<string>('DB_CONNECTION_URL');
  }

  getRedisHost(): string {
    return this.configService.get<string>('REDIS_HOST');
  }

  getRedisPort(): number {
    return this.configService.get<number>('REDIS_PORT');
  }

  getRedisPassword(): string {
    return this.configService.get<string>('REDIS_PASSWORD');
  }

  getRedisDb(): number {
    return this.configService.get<number>('REDIS_DB');
  }

  getAwsS3Region(): string {
    return this.configService.get<string>('AWS_S3_REGION');
  }

  getAwsAccessKeyId() {
    return this.configService.get<string>('AWS_S3_ACCESSKEYID');
  }

  getAwsSecretAccessKey() {
    return this.configService.get<string>('AWS_S3_SECRETACCESSKEY');
  }

  getAwsS3Bucket() {
    return this.configService.get<string>('AWS_S3_BUCKET');
  }

  getAwsS3RootFolder() {
    return this.configService.get<string>('AWS_S3_ROOT_FOLDER');
  }  

  getSolanaCluster(){
    return this.configService.get<'MAINNET' | 'DEVNET'>('SOLANA_CLUSTER')
  }

  getSolanaDevnetRPCUrl(){
    return this.configService.get<string>('SOLANA_RPC_URL_DEVNET');
  }

  getSolanaMainnetRPCUrl(){
    return this.configService.get<string>("SOLANA_RPC_URL_MAINNET");
  }

  getValidatorsAppUrl(){
    return this.configService.get<string>('VALIDATORS_APP_URL')
  }

  getValidatorsAppKey(){
    return this.configService.get<string>('VALIDATORS_APP_API_KEY')
  }

  getMongoDbUri(): string {
    return this.configService.get<string>('MONGODB_URI');
  }

  getMongoDbName(): string {
    return this.configService.get<string>('MONGODB_DB_NAME');
  }

  get apiKey(): string {
    return this.configService.get<string>('API_KEY');
  }
}
