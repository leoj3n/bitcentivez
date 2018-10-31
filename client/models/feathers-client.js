import feathersClientRest from '~/models/feathers-client-rest';
import feathersClientSocketio from '~/models/feathers-client-socketio';

let chosenClient;

if (System.isPlatform("window")) {
  chosenClient = feathersClientSocketio;
} else {
  chosenClient = feathersClientRest;
}

export default chosenClient;
