import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { SharedModule } from './shared/shared.module';
import { EventsGateway } from '@app/websocket.gateway';
import { FaultsCron } from '@app/cron/faults/faults.cronjob';
import { DeviceInfoCron } from '@app/cron/device-info/device-info.cronjob';
import { StatusCron } from '@app/cron/status/status.cronjob';
import { StatusService } from './service/status/status.service';
import { DeviceInfoService } from './service/device-info/device-info.service';
import { FaultsService } from './service/faults/faults.service';

@Module({
  imports: [
    SharedModule,
    ScheduleModule.forRoot(),
    RabbitMQModule.forRoot({
      exchanges: [
          {
              name: 'fault',
              type: 'topic'
          },
          {
              name: 'detour',
              type: 'topic'
          },
          {
              name: 'status',
              type: 'topic'
          }
      ],
      uri: 'amqp://guest:guest@rabbitmq:5672',
      prefetchCount: 1
  }),
  ],
  providers: [
    EventsGateway,
    FaultsCron,
    DeviceInfoCron,
    StatusCron,
    StatusService,
    DeviceInfoService,
    FaultsService,
  ],
})
export class AppModule {}
