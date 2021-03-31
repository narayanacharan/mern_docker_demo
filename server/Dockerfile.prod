FROM node:14-alpine3.10

LABEL version="1.0"
LABEL description="Production image for the Library MERN API"

WORKDIR /app

COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]