import io from 'steal-socket.io';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

const socket = io();
const feathersClient = feathers();

feathersClient.configure(socketio(socket));

export default feathersClient;
