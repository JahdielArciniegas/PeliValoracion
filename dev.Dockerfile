FROM node:24-alpine as dev

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host"]