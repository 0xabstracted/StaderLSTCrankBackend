import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ErrorResponseDto {
  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  errorMessage: string;

  @ApiProperty()
  @IsString()
  code: string;
}
