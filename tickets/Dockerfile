FROM node:alpine

WORKDIR /app
COPY package.json .
run npm install --only=prod
COPY . .

CMD ["npm", "start"]
