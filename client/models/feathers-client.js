//import feathersClient from '~/models/feathers-client-rest';
import feathersClientRest from '~/models/feathers-client-rest#?is-window';
import feathersClientSocketio from '~/models/feathers-client-socketio#?~is-window';

export default feathersClientRest ? feathersClientRest : feathersClientSocketio;
