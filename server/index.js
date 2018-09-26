'use strict';

// environment

if (process.argv.indexOf('--develop') !== -1) {
  process.env.NODE_ENV = 'development';
}

console.log(`process.env.NODE_ENV = '${process.env.NODE_ENV}'`);

// server app

const app = require('./app');
const port = process.env.PORT || app.get('port');
const server = app.listen(port);

server.on('listening', () =>
  console.log(
    `DoneJS and Feathers application started on http://${app.get(
      'host'
    )}:${port}`
  )
);

// live-reload

if (process.argv.indexOf('--develop') !== -1) {
  const path = require('path');
  const exec = require('child_process').exec;
  const killOnExit = require('kill-on-exit');

  const child = exec(
    path.join('node_modules', '.bin', 'steal-tools live-reload'),
    {
      cwd: app.get('client'),
    }
  );

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  killOnExit(child);
}
