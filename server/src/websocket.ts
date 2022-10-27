import { Server } from 'http';
import * as WebSocket from 'websocket';
import { Message } from './types';

export class SocketServer {
  wss: WebSocket.server;

  constructor(server: Server) {
    this.wss = new WebSocket.server({ httpServer: server });
    this.wss.on('request', (request: WebSocket.request) => {
      const connection = request.accept(undefined, request.origin);
      connection.on('message', (data) => {
        if (data.type === 'utf8') {
          const message: Message = JSON.parse(data.utf8Data);
          switch (message.event) {
          case 'message':
            this.broadcastMessage(message);
            break;
          case 'connection':
            this.broadcastMessage(message);
            break;
          }
        }

      });
    });

  }
  broadcastMessage = (message: any) => {
    this.wss.connections.forEach(client => {
      client.send(JSON.stringify(message));
    });
  };
}

