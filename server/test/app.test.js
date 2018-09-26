'use strict';

const app = require('../app');

const assert = require('assert');
const request = require('request');

describe('backend functional smoke test', function() {
  before(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('serves the development.html file', function(done) {
    request('http://localhost:3030/development.html', function(err, res, body) {
      assert.ok(body.indexOf('<html>') !== -1);
      done(err);
    });
  });
});
