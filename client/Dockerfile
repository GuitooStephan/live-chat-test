FROM node:15.6.0

WORKDIR /app

COPY package*.json ./

RUN npm ci -qy

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

EXPOSE 3000

COPY . .

CMD [ "npm", "run", "start" ]
