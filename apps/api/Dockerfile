FROM node:alpine

WORKDIR /app

COPY package*.json ./

COPY prisma ./app/src/prisma/

COPY .env ./

EXPOSE 3000

CMD npm start