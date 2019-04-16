FROM node:8.15.0-alpine

WORKDIR /app


COPY .npmrc /app
COPY package.json /app
RUN npm install
COPY . /app



CMD npm start