import { FaultsService } from './../../service/faults/faults.service';
import { Faults } from '../Interfaces/faults';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FaultsCron implements Faults {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(private faultsService: FaultsService) { }
  private logger = new Logger('Faults Cron Job');
  @Cron('45 * * * * *')
  public getFaults(param: string): string {
    this.logger.debug('Called when the current second is 45 publishing fault');
    this.faultsService.publishFaults({ evId: 'xyz', message: 'battery gone', clientId: 'ebusdev' });
    return 'hello' + param;
  }
}
