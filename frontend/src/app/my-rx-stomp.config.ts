import { HostListener } from '@angular/core';
import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {
  brokerURL: 'wss://172.17.0.1:56400/websocket',

  connectHeaders: {
    login: "guest",
    passcode: "guest",
    host: "localhost",
  },

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 200,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};