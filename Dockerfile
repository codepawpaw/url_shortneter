FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install -g concurrently
RUN npm install -g sequelize-cli
RUN npm install -g nodemon
RUN npm install

ENV NODE_ENV=development
ENV PORT=9000

ENV DATABASE_NAME=shorten_url
ENV DATABASE_USER=user
ENV DATABASE_PASSWORD=P@ssw0Rd
ENV DATABASE_HOST=db