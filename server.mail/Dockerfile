FROM node:14.15.4 

WORKDIR /mail

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000