import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../environment-config';
import { ServiceLevelLogger } from '../logger-config/service-logger.provider';
import { StorageService } from './storage-service/storage-service.interface';
import { S3StorageService } from './storage-service/s3-storage-service';


@Module({
  imports:[
    EnvironmentConfigModule
  ],
  providers:[
    {
      provide:StorageService,
      useClass:S3StorageService,
    },
    {
      provide:"S3-SERVICE-LOGGER",
      useValue:new ServiceLevelLogger('S3-SERVICE-LOGGER')
    }
  ],
  exports:[
    {
      provide:StorageService,
      useClass:S3StorageService
    },
  ]
})
export class UtilsModule{}