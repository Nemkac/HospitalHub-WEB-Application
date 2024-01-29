import { HostListener } from '@angular/core';
import { RxStompConfig } from '@stomp/rx-stomp';

export const myRxStompConfig: RxStompConfig = {
  brokerURL: 'wss://127.0.0.1:61613',

  connectHeaders: {
    login: "guest",
    passcode: "guest",
  },

  heartbeatIncoming: 2000,
  heartbeatOutgoing: 20000,

  reconnectDelay: 5000,

  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
};