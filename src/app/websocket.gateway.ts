import { UseInterceptors, Injectable } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

import { RedisPropagatorInterceptor } from '@app/shared/redis-propagator/redis-propagator.interceptor';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';

@UseInterceptors(RedisPropagatorInterceptor)
@Injectable()
@WebSocketGateway()
export class EventsGateway {

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  @RabbitSubscribe({
    exchange: 'fault',
    routingKey: 'faults'
  })
  public publishFaults(data) {
    return { event: 'fault', data: data };
  }
}
