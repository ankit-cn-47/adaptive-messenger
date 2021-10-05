import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketStateService {
  private socketState = new Map<string, Socket[]>();

  public remove(clientId: string, socket: Socket): boolean {
    const existingSockets = this.socketState.get(clientId);

    if (!existingSockets) {
      return true;
    }

    const sockets = existingSockets.filter((s) => s.id !== socket.id);

    if (!sockets.length) {
      this.socketState.delete(clientId);
    } else {
      this.socketState.set(clientId, sockets);
    }

    return true;
  }

  public add(clientId: string, socket: Socket): boolean {
    const existingSockets = this.socketState.get(clientId) || [];

    const sockets = [...existingSockets, socket];

    this.socketState.set(clientId, sockets);

    return true;
  }

  public get(clientId: string): Socket[] {
    return this.socketState.get(clientId) || [];
  }

  public getAll(): Socket[] {
    const all = [];

    this.socketState.forEach((sockets) => all.push(sockets));

    return all;
  }
}
