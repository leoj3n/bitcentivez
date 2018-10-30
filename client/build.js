const stealTools = require('steal-tools');

const buildPromise = stealTools.build(
  {},
  {
    minify: false,
    bundleAssets: {
      infer: true,
      glob: ['img/**/*'],
    },
    treeShaking: false,
  }
);
