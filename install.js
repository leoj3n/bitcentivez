const exec = require('child_process').exec;

// install server and client dependencies
let cmd = 'npm install --prefix server && npm install --prefix client';

// build client on production install
if (process.env.NODE_ENV === 'production') {
  cmd += ' && npm run build --prefix client';
}

const child = exec(cmd);

child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);
