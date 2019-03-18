FROM node:8.15.0-alpine

WORKDIR /app


ENV NODE_EXTRA_CA_CERTS=/app/zscaler/ZscalerRootCertificate-2048-SHA256.crt
COPY zscaler/ZscalerRootCertificate-2048-SHA256.crt /app/zscaler/ZscalerRootCertificate-2048-SHA256.crt
COPY .npmrc /app
COPY package.json /app
RUN npm install
COPY . /app



CMD npm start