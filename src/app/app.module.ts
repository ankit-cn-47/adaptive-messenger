import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { SharedModule } from './shared/shared.module';
import { EventsGateway } from './test.gateway';
import { FaultsCron } from '@app/cron/faults/faults.cronjob';
import { DeviceInfoCron } from '@app/cron/device-info/device-info.cronjob';
import { StatusCron } from '@app/cron/status/status.cronjob';
import { StatusService } from './service/status/status.service';
import { DeviceInfoService } from './service/device-info/device-info.service';
import { FaultsService } from './service/faults/faults.service';

@Module({
  imports: [HttpModule, SharedModule, ScheduleModule.forRoot()],
  providers: [EventsGateway, FaultsCron, DeviceInfoCron, StatusCron, StatusService, DeviceInfoService, FaultsService],
})
export class AppModule {
}
