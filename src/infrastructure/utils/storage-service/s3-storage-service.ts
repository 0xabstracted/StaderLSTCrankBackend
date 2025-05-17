import { Injectable,Inject, Body } from '@nestjs/common';
import { IUploadFile, StorageService } from './storage-service.interface';
import { EnvironmentConfigService } from 'src/infrastructure/environment-config';
import {S3,PutObjectCommand} from "@aws-sdk/client-s3";
import { ServiceLevelLogger } from 'src/infrastructure/logger-config/service-logger.provider';




@Injectable()
export class S3StorageService implements StorageService{
  private s3:S3
  constructor(
    @Inject('S3-SERVICE-LOGGER')
    private logger:ServiceLevelLogger,
    private readonly environmentConfigService:EnvironmentConfigService
  ){
    this.s3 = new S3({
      region:this.environmentConfigService.getAwsS3Region(),
      credentials:{
        accessKeyId:this.environmentConfigService.getAwsAccessKeyId(),
        secretAccessKey:this.environmentConfigService.getAwsSecretAccessKey()
      }
    })
  }
  async uploadFile(params: IUploadFile) {
    try{  
      const buffer = Buffer.from(params.fileBuffer);
      const bucket = this.environmentConfigService.getAwsS3Bucket();

      const uploadParams = {
        Bucket:bucket,
        Key:`${this.environmentConfigService.getAwsS3RootFolder()}${params.folder}/${params.filename}.jpg`,
        Body:buffer,
        ContentType:'image/jpeg'
      }

      const command = new PutObjectCommand(uploadParams);
      const response = await this.s3.send(command);
      const fileUrl = `https://${this.environmentConfigService.getAwsS3Bucket()}.s3.${this.environmentConfigService.getAwsS3Region()}.amazonaws.com/${
        uploadParams.Key
      }`;
      return fileUrl
    }
    catch(error){
      this.logger.error(`Error while uploading image to S3`,error);
      throw new Error(error)
    }
  }
}