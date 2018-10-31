import rest from '@feathersjs/rest-client';
import feathers from '@feathersjs/feathers';

let feathersClient;

if (System.isPlatform("window")) {
  feathersClient = false;
} else {
  const restClient = rest();
  feathersClient = feathers();

  feathersClient.configure(restClient.fetch(window.fetch));
}

export default feathersClient;
