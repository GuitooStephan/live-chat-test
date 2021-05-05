FROM node:15.6.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm config set unsafe-perm true

RUN npm install -g nodemon && npm ci -qy

COPY . .

EXPOSE 8080 80

CMD [ "npm", "run", "server" ]