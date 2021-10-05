import { RedisSocketEventEmitDTO } from './socket-event-emit.dto';

export class RedisSocketEventSendDTO extends RedisSocketEventEmitDTO {
  public readonly clientId: string;
  public readonly socketId: string;
}
