//import feathersClient from '~/models/feathers-client-#{~/models/rest-or-socketio}';
import feathersClientSocketio from '~/models/feathers-client-socketio#?is-window';
import feathersClientRest from '~/models/feathers-client-rest#?~is-window';

const feathersClient = feathersClientSocketio ? feathersClientSocketio : feathersClientRest;

export default feathersClient;
