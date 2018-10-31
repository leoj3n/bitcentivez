import rest from '@feathersjs/rest-client';
import feathers from '@feathersjs/feathers';

const restClient = rest();
const feathersClient = feathers();

feathersClient.configure(restClient.fetch(window.fetch));

export default feathersClient;
