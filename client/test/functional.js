import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('frontend functional smoke test', {
  beforeEach() {
    F.open('development.html');
  },
});

QUnit.test('development.html loads', function() {
  F('title').text('Bitcentivez', 'dynamic title is set');
});
