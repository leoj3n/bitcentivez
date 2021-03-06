//!steal-remove-start
import { debug } from 'can';
debug();
//!steal-remove-end

import {
  DefineMap,
  route,
  RoutePushstate,
  value,
  stache,
  stacheRouteHelpers,
} from 'can';

import loader from '@loader';

stache.addHelper(stacheRouteHelpers);

if (!loader.useHashchange) {
  route.urlData = new RoutePushstate();
}
route.register('{page}', { page: 'home' });

const AppViewModel = DefineMap.extend('App', {
  routeData: {
    default: () => route.data,
  },
  title: {
    default: 'Bitcentivez',
  },
  pagePromise: {
    default: undefined,
  },
  get pageComponent() {
    const moduleName = `~/components/${this.pageComponentConfig.moduleName}`;
    return steal.import(moduleName).then(({ Component }) => {
      return new Component({ viewModel: this.pageComponentConfig.viewModel() });
    });
  },
  get pageComponentConfig() {
    switch (this.routeData.page) {
      case 'home':
        return {
          title: 'Home',
          componentName: 'page-home',
          viewModel: () => ({}),
          moduleName: 'page-home/',
        };
      case 'contributors':
        return {
          title: 'Contributors',
          componentName: 'page-contributors',
          viewModel: () => ({
            contributors: value.to(this, 'pagePromise'),
          }),
          moduleName: 'page-contributors/',
        };
      default:
        return {
          title: 'Page Not Found',
          componentName: 'four-oh-four',
          viewModel: () => ({}),
          moduleName: 'four-oh-four.component!',
          statusCode: 404,
        };
    }
  },
  statusCode: {
    get: function(lastSet, resolve) {
      const pageConfig = this.pageComponentConfig;

      if (pageConfig.statusCode) {
        return pageConfig.statusCode;
      }

      const pagePromise = this.pagePromise;

      if (pagePromise) {
        // pagePromise is guaranteed to be resolved here because done-ssr will
        // not call the statusCode getter until the app is done loading
        return pagePromise.then(
          () => {
            resolve(200);
          },
          () => {
            resolve(404);
          }
        );
      } else {
        return 200;
      }
    },
  },
});

export default AppViewModel;
