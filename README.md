# React App

## Info:

This is a simple authentication app, built with stack:

- Front-end: react, redux, SASS
- Back-end: nodejs

<img width="435" alt="Screenshot 2019-12-17 at 06 46 50" src="https://user-images.githubusercontent.com/21174154/70952551-23be9880-2099-11ea-9f9d-6723c9ca4999.png">

<img width="416" alt="Screenshot 2019-12-17 at 06 46 58" src="https://user-images.githubusercontent.com/21174154/70952554-25885c00-2099-11ea-8ba3-5f92d61bd813.png">

<img width="420" alt="Screenshot 2019-12-17 at 06 47 15" src="https://user-images.githubusercontent.com/21174154/70952556-27eab600-2099-11ea-8558-d662940ecc2d.png">

## Setup:

- Server configs: copy ./server/config/index.example.js to ./server/config/index.js and fill in accordingly (MongoDB URI, client app url, email config, jwt secret)

- Client configs: copy ./src/config/index.example.js to ./src/config/index.js and fill in accordingly (server url, leave blank if client and server are the same)

## Run:

### Install
```
yarn
```

### Development

- make sure MongoDB is up and running


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

- make sure MongoDB is up and running

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
