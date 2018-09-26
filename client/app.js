import loader from '@loader';
import { DefineMap, route, RoutePushstate } from 'can';

//!steal-remove-start
import { debug } from 'can';
debug();
//!steal-remove-end

const AppViewModel = DefineMap.extend('App', {
  env: {
    serialize: false,
    default: () => ({NODE_ENV:'development'})
  },
  loaderEnv: {
    serialize: false,
    default: () => {
      if (loader.isEnv('development')) {
        return 'development';
      }
      if (loader.isEnv('production')) {
        return 'production';
      }

      return 'unknown';
    },
  },
  page: 'string',
  title: {
    serialize: false,
    default: 'Bitcentivez',
  },
});

if (!loader.useHashchange) {
  route.urlData = new RoutePushstate();
}
route.register('{page}', { page: 'home' });

export default AppViewModel;
