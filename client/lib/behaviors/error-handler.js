import { connect } from 'can';

const errorHandler = connect.behavior('error-handler', baseConnect => {
  const behavior = {};

  ['getData', 'getListData', 'createData', 'updateData', 'destroyData'].forEach(
    method => {
      behavior[method] = (...args) => {
        const promise = baseConnect[method].apply(baseConnect, args);
        promise.catch(e => {
          console.error({
            type: 'alert',
            kind: 'danger',
            title: 'Error',
            message:
              (e.responseJSON && e.responseJSON.message) ||
              e.responseText ||
              e.message,
          });
        });

        return promise;
      };
    }
  );

  return behavior;
});

export default errorHandler;
