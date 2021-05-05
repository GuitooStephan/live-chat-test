FROM node:15.6.0

WORKDIR /app

COPY package*.json ./

RUN npm ci -qy 

EXPOSE 3000

COPY . .

CMD [ "npm", "run", "start" ]
