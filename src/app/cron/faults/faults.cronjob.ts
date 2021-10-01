import { Faults } from '../Interfaces/faults';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FaultsCron implements Faults {
  private logger = new Logger('Faults Cron Job');
  @Cron('45 * * * * *')
  public getFaults(param: string): string {
    this.logger.debug('Called when the current second is 45');
    return 'hello' + param;
  }
}
