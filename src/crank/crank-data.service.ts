import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { ListPaginationDto } from 'dtos';
import { StakeDelegation } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CrankDataService{
  constructor(
    @InjectRepository(StakeDelegation)
    private readonly stakeDelegationRepository:Repository<StakeDelegation>,
  ){} 

  async getStakeDelegationsList(paginationParams: ListPaginationDto){
    try{
      // const {page,limit} = paginationParams;
      const page = Number(paginationParams.page) > 0 ? Number(paginationParams.page) : 1;
      const limit =  Number(paginationParams.limit) > 0 ? Number(paginationParams.limit) : 10; 
      const skip = Number((page - 1) * limit);
      const [stakeDelegations,total] = await this.stakeDelegationRepository.findAndCount(
        {
          skip:skip,
          take:limit,
          order:{
            stakedAmount:'DESC'
          }
        }
      )
      return {
        total,
        page,
        limit,
        data:stakeDelegations
      }
    }
    catch(error){
      console.log(error)
      throw new HttpException('Error while getting validator records',HttpStatus.BAD_REQUEST,{
        cause:error
      })
    }
  }

}