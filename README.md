# Basic Express Testing

A basic express setup for testing purposes

Includes

- Express
- Webpack
- Prettier
- ESLint

## Setup

- `npm i`
- Run the server
- Build frontend assets
- Visit http://localhost:3000

## All Helpful Commands

Run the server:

```
$ node index.js
```

Fix issues:

```
$ npm eslint:fix
```

Compile frontend assets:

- No hot reloading
- Output to `/public/dist`
- Assets available at http://localhost:1988/

```
$ npm run webpack:watch
// or
$ npm run webpack:clean && npm run wepack:build
```
