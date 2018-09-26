import canMap from 'can-connect/can/map/';
import canRef from 'can-connect/can/ref/';
import errorHandler from './behaviors/error-handler';
import { Reflect, QueryLogic, connect, connectFeathers } from 'can';

export default function(options) {
  options = Reflect.assignDeep({}, options);

  if (!options.idProp) {
    // TODO: remove this when this issue is closed:
    // https://github.com/canjs/can-connect/issues/100
    options.idProp = '_id';
  }
  if (!options.name) {
    options.name = Reflect.getName(options.Map) + '.connection';
  }
  if (!options.queryLogic) {
    options.queryLogic = new QueryLogic(options.Map);
  }

  const behaviors = [
    connectFeathers.service,
    canMap,
    canRef,
    connect.constructor,
    connect.constructorStore,
    connect.constructorCallbacksOnce,
    connect.realTime,
    connect.dataParse,
    connect.dataCallbacks,
    connect.dataCombineRequests,
    errorHandler,
  ];

  if (typeof localStorage !== 'undefined') {
    if (!options.cacheConnection) {
      options.cacheConnection = connect(
        [connect.dataLocalStorageCache],
        {
          name: options.name + '.cacheConnection',
          idProp: options.idProp,
          queryLogic: options.queryLogic,
        }
      );
    }

    behaviors.push(connect.dataCallbacksCache, connect.fallThroughCache);
  }

  return connect(
    behaviors,
    options
  );
}
