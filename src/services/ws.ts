import { Client } from '../interfaces';

/* eslint-disable no-console */
export const WsClientConnection = (client: Client): void => {
  console.log('User connected...');

  client.on('disconnect', () => console.log('User disconnected'));

  client.on('message', data => console.log(data));
};
