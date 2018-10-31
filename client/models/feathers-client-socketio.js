import io from 'steal-socket.io';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

let feathersClient;

if (System.isPlatform("window")) {
  const socket = io();
  feathersClient = feathers();

  feathersClient.configure(socketio(socket));
} else {
  feathersClient = false;
}

export default feathersClient;
