import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidatorsModule } from './validators/validators.module';
import { UtilsModule } from './utils/utils.module';
import { EventModule } from './infrastructure/event-monitor/event.module';
import { DatabaseModule } from './infrastructure/mongoose/database.module';
import { CrankModule } from './crank/crank.module';
import { EpochModule } from './epoch/epoch.module';
import { StateModule } from './state/state.module';
import { ListenersModule } from './listeners/listeners.module';


@Module({
  imports: [
    ScheduleModule.forRoot(),
    DatabaseModule,
    UtilsModule,
    ValidatorsModule,
    EventModule,
    CrankModule,
    EpochModule,
    StateModule,
    ListenersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
