import { Faults } from '../Interfaces/faults';
import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WebSocketServer } from '@nestjs/websockets';
import { EventsGateway } from '@app/test.gateway';
import { take } from 'rxjs/operators';

@Injectable()
export class FaultsCron {
    private logger = new Logger('Device Info Cron Job')
    constructor(private eventPub: EventsGateway, private http: HttpService) { }
    @Cron('45 * * * * *')
    public getFaults(): void {
    this.logger.debug('Called when the current second is 45');
    this.http.get('http://192.168.31.111:4000/GetFeed/FaultData').pipe(
      take(1)
    ).subscribe(res => {
      if(res.data!='Ok') {
        this.eventPub.publishFault({data: res.data}) ;
      }
    })
          
  }
}
