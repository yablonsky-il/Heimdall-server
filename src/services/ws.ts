/* eslint-disable no-console */
export const WsClientConnection = (client) => {
  console.log('User connected...');

  client.on('disconnect', () => console.log('User disconnected'));

  client.on('message', data => console.log(data));
};
