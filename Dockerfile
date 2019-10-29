FROM node:10.12.0-slim
LABEL MAINTAINER="Rodolfo Berlezi - @rodolfoberlezi"
ENV PORT=3100
ENV NODE_ENV=production

COPY . /app
WORKDIR /app

RUN npm config set strict-ssl false && rm -rf node_modules/ && npm install
EXPOSE $PORT
CMD npm start