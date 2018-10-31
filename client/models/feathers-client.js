import '~/models/feathers-client-rest#?always-false';
import '~/models/feathers-client-socketio#?always-false';
import feathersClient from '~/models/feathers-client-#{~/models/rest-or-socketio}';

console.log('feathers client ...');

export default feathersClient;
