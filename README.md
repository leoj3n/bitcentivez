# bitcentivez

A fancy client/server application.

## npm run

Development:

```console
npm install
npm test
npm run build
npm run develop-ssr
npm run develop-static
npm run lint
```

Everything:

```console
Lifecycle scripts included in bitcentivez:
  install
    node $npm_package_main
  start
    npm start --prefix server
  test
    npm run test --prefix server && npm run test --prefix client

available via `npm run-script`:
  build
    npm run build --prefix client
  develop-ssr
    npm run develop-ssr --prefix server
  develop-static
    npm run develop-static --prefix server
  lint
    npm run prettier-multi && npm run prettier-pkg && npm run prettier-html
  prettier-html
    prettier --parser html --write '**/*.html'
  prettier-multi
    prettier --single-quote --trailing-comma es5 --write '**/*.{js,json,md,less}'
  prettier-pkg
    prettier-package-json --write package.json client/package.json server/package.json
```

## Deploy to Heroku

```console
heroku git:remote -a bitcentivez
git push heroku master
```

Heroku will handle running the build command.
