FROM node:14.15.4 AS ui-build

WORKDIR /usr/src/app
COPY client/ ./client/

RUN cd client && npm install @angular/cli@12.0.1 && npm install && npm run build

FROM node:14.15.4 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/client/dist ./client/dist
COPY package*.json ./
RUN npm install
COPY *.js ./

EXPOSE 3000