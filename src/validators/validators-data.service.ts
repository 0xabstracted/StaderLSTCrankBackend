import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListPaginationDto } from 'dtos';
import { Validator } from 'src/entities';
import { Repository, In } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ServiceLevelLogger } from 'src/infrastructure';
import { EnvironmentConfigService } from 'src/infrastructure';
import axios from 'axios';

@Injectable()
export class ValidatorsDataService {
  constructor(
    @InjectRepository(Validator)
    private readonly validatorRepository: Repository<Validator>,
    @Inject('VALIDATORS_DATA_SERVICE_LOGGER')
    private readonly logger: ServiceLevelLogger,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  private mapToEntity(data: any): Partial<Validator> {
    return {
      account: data.account,
      voteAccount: data.vote_account,
      wwwUrl: data.www_url,
      details: data.details,
      jito: data.jito,
      isActive: data.is_active,
      avatarFileUrl: data.avatar_file_url,
      activeStake: data.active_stake,
      commission: data.commission,
      delinquent: data.delinquent,
      softwareVersion: data.software_version,
      ip: data.ip,
      dataCenterKey: data.data_center_key,
      latitude: data.latitude,
      longitude: data.longitude,
      dataCenterHost: data.data_center_host,
      epochCredits: data.epoch_credits,
      skippedSlots: data.skipped_slots,
      skippedSlotPercent: parseFloat(data.skipped_slot_percent),
      totalScore: data.total_score,
    };
  }

  async createOrUpdateBulk(validators: any[]) {
    try {
      const voteAccounts = validators.map((v) => v.vote_account);
      const existingValidators = await this.validatorRepository.find({
        where: { voteAccount: In(voteAccounts) },
      });

      const existingMap = new Map(
        existingValidators.map((ev) => [ev.voteAccount, ev]),
      );
      const toInsert = [];
      const toUpdate = [];

      for (const data of validators) {
        const existing = existingMap.get(data.vote_account);
        if (existing) {
          const merged = this.validatorRepository.merge(
            existing,
            this.mapToEntity(data),
          );
          toUpdate.push(merged);
        } else {
          toInsert.push(this.mapToEntity(data));
        }
      }

      if (toInsert.length > 0) {
        await this.validatorRepository.save(toInsert);
      }

      if (toUpdate.length > 0) {
        await this.validatorRepository.save(toUpdate);
      }
    } catch (error) {
      this.logger.debug('error while insert validators data in db');
      throw new HttpException(
        'Error while updating validators data',
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async createValidator(validatorData: any) {
    try {
      const newValidator = this.validatorRepository.create(
        this.mapToEntity(validatorData),
      );
      return await this.validatorRepository.save(newValidator);
    } catch (error) {
      throw new HttpException(
        'Error while storing validator details',
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async getValidatorsList(paginationParams: ListPaginationDto) {
    try {
      // const {page,limit} = paginationParams;
      const page =
        Number(paginationParams.page) > 0 ? Number(paginationParams.page) : 1;
      const limit =
        Number(paginationParams.limit) > 0
          ? Number(paginationParams.limit)
          : 10;
      const skip = Number((page - 1) * limit);
      const [validators, total] = await this.validatorRepository.findAndCount({
        skip: skip,
        take: limit,
        order: {
          totalScore: 'DESC',
        },
      });
      return {
        total,
        page,
        limit,
        data: validators,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error while getting validator records',
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async updateValidators() {
    try {
      this.logger.log('Updating Validators data');
      const validatorsAppUrl =
        this.environmentConfigService.getValidatorsAppUrl();
      const validatorsAppApiKey =
        this.environmentConfigService.getValidatorsAppKey();

      const validators = await this.validatorRepository.find();

      for (const validator of validators) {
        const account = validator.account;

        // This api response gets you latest stats of validators on our table.
        const apiResponse = await axios.get(`${validatorsAppUrl}${account}`, {
          headers: { Token: validatorsAppApiKey },
        });

        // in updated data you get the updated details of particular validator.
        const updatedData = apiResponse.data;

        // 1. Check delinquient status if true you need to delete its record and push it to delinquent validators table.
        // 2. Check a score, if score fall below threshold lets consider 8 to be threshold score or lower that means lower yeild to be expected also push it to delinquient so you can redelegate to new validators

        //This is a query to update validators table in postgres db
        // if all the criterias are passed for a valid validator on stader protocol
        await this.validatorRepository.update(
          { id: validator.id },
          {
            activeStake: updatedData.active_stake,
            commission: updatedData.commission,
            delinquent: updatedData.delinquent,
            epochCredits: updatedData.epoch_credits,
            softwareVersion: updatedData.software_version,
            totalScore: updatedData.total_score,
          },
        );
      }
      this.logger.log(`Validators data updated successfully at ${Date.now()}`);
    } catch (error) {
      console.log('Error while updating validators data: ', error);
      throw new HttpException(
        'Error while updating validators data',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // async updateValidators(){
  //   try{
  //     this.logger.log("HELLO");

  //   }
  //   catch(error){
  //     console.log("Error while updating validators data: ",error.message || error)
  //     throw new HttpException(
  //       'Error while updating validators data',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //       {
  //         cause:error
  //       }
  //     )
  //   }
  // }
}
