//import feathersClient from '~/models/feathers-client-rest';
import feathersClientRest from '~/models/feathers-client-rest#?bitcentivez-client/models/is-window';
import feathersClientSocketio from '~/models/feathers-client-socketio#?~bitcentivez-client/models/is-window';

export default feathersClientRest ? feathersClientRest : feathersClientSocketio;
