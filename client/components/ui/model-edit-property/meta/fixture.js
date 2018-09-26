import { DefineMap, DefineList, fixture, superModel } from 'can';

let Entity = DefineMap.extend('Entity', {
  id: { type: 'number', identity: true },
  name: 'string',
});

Entity.List = DefineList.extend('EntityList', {
  '#': Entity,
});

let mockData = fixture.store(
  [
    {
      id: 1,
      name: 'Project',
    },
    {
      id: 2,
      name: 'Contributor',
    },
    {
      id: 3,
      viewOnly: true,
      name: 'View only option',
    },
  ],
  Entity
);

fixture('/entities/{id}', mockData);

Entity.connection = superModel({
  Map: Entity,
  name: 'entity',
  List: Entity.List,
  url: '/entities/{id}',
});

export default Entity;
