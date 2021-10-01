import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DeviceInfo } from '@app/cron/Interfaces/device-info';

@Injectable()
export class DeviceInfoCron implements DeviceInfo {
  private logger = new Logger('Device Info Cron Job');
  @Cron('45 * * * * *')
  public getDeviceInfo(param: string): string {
    this.logger.debug('Called when the current second is 45');
    return 'hello' + param;
  }
}
