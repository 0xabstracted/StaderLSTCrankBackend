import { IsOptional,IsInt,Min } from 'class-validator';
import { Type } from '@nestjs/class-transformer';


export class ListPaginationDto{
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(()=>Number)
  page?:number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(()=>Number)
  limit?:number = 10;

}