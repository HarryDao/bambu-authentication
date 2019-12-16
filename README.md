# React App

## Info:

This is a simple authentication app, built with stack:

- Front-end: react, redux, SASS
- Back-end: nodejs

## Setup:

- Server configs: copy ./server/config/index.example.js to ./server/config/index.js and fill in accordingly (MongoDB URI, client app url, email config, jwt secret)

- Client configs: copy ./src/config/index.example.js to ./src/config/index.js and fill in accordingly (server url, leave blank if client and server are the same)

## Run:

### install
```
yarn
```

### Development

- run client:

```
yarn dev:client
```

- run server:

```
yarn dev:server
```

- app should be served on http://localhost:3000

### Production

- leave SERVER_URL in ./src/config/index.js blank (so client and server is the same)

- build client production

```
yarn build
```

- run server

```
yarn start
```

- app should be served on http://localhost:3001

### test

- test for client app

```
yarn test
```

- test for server app

```
yarn test:server
```
