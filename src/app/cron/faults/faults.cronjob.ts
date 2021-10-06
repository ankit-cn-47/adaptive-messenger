import { Faults } from '../Interfaces/faults';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsGateway } from '@app/test.gateway';

@Injectable()
export class FaultsCron implements Faults {
    private logger = new Logger('Device Info Cron Job')
    constructor(private eventPub: EventsGateway) { }
    @Cron('45 * * * * *')
    public getFaults(param: string): string {
    this.logger.debug('Called when the current second is 45');
    this.eventPub.publishFault({data: 'hello'})
        return 'hello'+ param;        
    }
}
