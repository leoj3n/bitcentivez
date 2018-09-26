'use strict';

const assert = require('assert');
const app = require('../../../app');

describe('contributor service', function() {
  it('registered the contributors service', () => {
    assert.ok(app.service('api/contributors'));
  });
});
