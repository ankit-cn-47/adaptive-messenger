import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FaultsService {
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor(private publisher: AmqpConnection) { }

    public publishFaults(data): void {
        this.publisher.publish('fault', 'faults', data);
    }
}
