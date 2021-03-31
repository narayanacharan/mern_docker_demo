FROM node:14-alpine3.10

LABEL version="1.0"
LABEL description="React Frontend for the Library API"

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]

