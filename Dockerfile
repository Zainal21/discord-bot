FROM node:16-alpine

WORKDIR /src/usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN node deploy-commands.js

CMD [ "node", "app.js" ]