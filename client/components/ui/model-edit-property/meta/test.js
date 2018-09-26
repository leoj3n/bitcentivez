import QUnit from 'steal-qunit';
import Entity from './fixture';
import { DefineMap, stache } from 'can';
import { ViewModel } from '../model-edit-property';

// ViewModel unit tests
QUnit.module('~/components/ui/model-edit-property', {
  beforeEach: function() {
    window.localStorage.clear();
  },
});

QUnit.test('has initial property value', function() {
  let name = 'Foo';

  let entity = new Entity({
    name,
  });

  let vm = new ViewModel({
    model: entity,
    property: 'name',
  });

  QUnit.equal(vm.propertyValue, name);
});

QUnit.test('can update and save property', function(assert) {
  let done = assert.async();

  Entity.getList({}).then(records => {
    let newName = 'Bar';
    let entity = records[0];

    QUnit.notEqual(entity.name, newName);

    let vm = new ViewModel({
      model: entity,
      property: 'name',
    });

    vm.commitValue(newName).then(updatedEntity => {
      QUnit.equal(updatedEntity.name, newName);
      done();
    });
  });
});

QUnit.test('saveModel is called for saving', function(assert) {
  expect(1);

  let model = new DefineMap({});
  let saveModel = new DefineMap({});

  saveModel.save = function() {
    QUnit.ok(true, 'save is called correctly');
    return Promise.resolve();
  };

  let vm = new ViewModel({
    model,
    saveModel,
  });

  vm.commitValue();
});

QUnit.test('view-only mode', function() {
  let vm = new (DefineMap.extend({
    record: DefineMap,
  }))({
    record: { name: 'I am viewOnly' },
    viewOnly: true,
  });

  const frag = stache(
    '<model-edit-property model:from="record" property:raw="name" viewOnly:from="viewOnly" />'
  )(vm);

  QUnit.ok(frag.querySelector('span'), 'renders a span for the view-only mode');
});
