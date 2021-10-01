import { Status } from '@app/cron/Interfaces/status';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class StatusCron implements Status {
  private logger = new Logger('Status Cron Job');
  @Cron('45 * * * * *')
  public getStatus(param: string): string {
    this.logger.debug('Called when the current second is 45');
    return 'hello' + param;
  }
}
