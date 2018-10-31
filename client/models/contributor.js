import superModel from '~/lib/super-model';
import feathersQuery from './feathers-query';

import '~/models/feathers-client-rest#?always-false';
import '~/models/feathers-client-socketio#?always-false';

import feathersClient from './feathers-client';
import { DefineMap, DefineList, QueryLogic } from 'can';

const Contributor = DefineMap.extend(
  'Contributor',
  { seal: false },
  {
    _id: {
      type: 'string',
      identity: true,
    },
    name: 'string',
    email: 'string',
    active: 'boolean',
  }
);

Contributor.List = DefineList.extend('ContributorList', {
  '#': Contributor,
});

Contributor.connection = superModel({
  Map: Contributor,
  List: Contributor.List,
  queryLogic: new QueryLogic(Contributor, feathersQuery),
  feathersService: feathersClient.service('api/contributors'),
});

export default Contributor;
