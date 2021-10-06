import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DeviceInfo } from '@app/cron/Interfaces/device-info';
import { EventsGateway } from '@app/test.gateway';
import { elementAt, take } from 'rxjs/operators';

@Injectable()
export class DeviceInfoCron {
    route = [
        {
           "latitude":11.649971,
           "longitude":48.087209
        },
        {
           "latitude":11.649965,
           "longitude":48.086691
        },
        {
           "latitude":11.650216,
           "longitude":48.086598
        },
        {
           "latitude":11.648492,
           "longitude":48.083829
        },
        {
           "latitude":11.651963,
           "longitude":48.069805
        },
        {
           "latitude":11.636301,
           "longitude":48.069805
        },
        {
           "latitude":11.636301,
           "longitude":48.060472
        },
        {
           "latitude":11.655499,
           "longitude":48.031125
        },
        {
           "latitude":11.656182,
           "longitude":48.029319
        },
        {
           "latitude":11.658372,
           "longitude":48.027566
        },
        {
           "latitude":11.740605,
           "longitude":48.084963
        },
        {
           "latitude":11.758952,
           "longitude":48.137871
        },
        {
           "latitude":11.75882,
           "longitude":48.140176
        },
        {
           "latitude":11.8339,
           "longitude":48.159369
        },
        {
           "latitude":11.848602,
           "longitude":48.175977
        }
     ]
    constructor(private eventPub: EventsGateway, private http: HttpService) { }
    private logger = new Logger('Device Info Cron Job');
    @Cron('45 * * * * *')
    public getDeviceInfo() {
    this.logger.debug('Called when the current second is 45');
    this.http.post('http://192.168.31.111:4000/Get/DeviceStatusInfo', {"vehicleId": 'bus1'}).pipe(
        take(1)
      ).subscribe(res => {
          console.log('received response', res.data);
        const routeCoordinate = this.route.filter((coordinate: {latitude: number, longitude: number}) => {
            return (coordinate.longitude === res.data.longitude && coordinate.latitude === res.data.latitude)
        })
        console.log(routeCoordinate);
        if(routeCoordinate.length ===0) {
            this.eventPub.publishFault({data: 'detour by the bus'})
        }
    });
    }
}
