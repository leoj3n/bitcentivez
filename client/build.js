const stealTools = require('steal-tools');

const buildPromise = stealTools.build(
  {},
  {
    minify: true,
    bundleAssets: {
      infer: true,
      glob: ['img/**/*'],
    },
    treeShaking: false,
  }
);
