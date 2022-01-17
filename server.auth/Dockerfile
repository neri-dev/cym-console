FROM node:14.15.4 

WORKDIR /auth

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000