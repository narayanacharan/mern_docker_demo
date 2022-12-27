version: "3.8"

services:
   library-api:
      restart: always
      build:
         context: ./server
         dockerfile: Dockerfile
      container_name: library_mern_nginx
      # volumes allow sharing of data in run-time between host and container
      volumes:
         # don't overwrite this folder in container with the local one
         - /app/node_modules
         # map current local directory to the /app inside the container
         #This is a must for development in order to update our container whenever a change to the source code is made. Without this, you would have to rebuild the image each time you make a change to source code.

         - ./server:/app
      ports:
         - 5000:5000
      depends_on:
         - mongodb
      environment:
         NODE_ENV: ${NODE_ENV}
         MONGO_URI: mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@mongodb
      networks:
         - library-mern-api

   mongodb:
      image: mongo
      restart: always
      ports:
         - 27017:27017
      environment:
         MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
         MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      volumes:
         # for persistence storage
         - mongodb-data:/data/db
      networks:
         - library-mern-api

      # mongo-express should only be used privately for development purposes.
      # It helps us interact with a mongoDB database using our browser
   mongo-express:
      image: mongo-express
      depends_on:
         - mongodb
      ports:
         - 8081:8081
      environment:
         ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_ROOT_USERNAME}
         ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_ROOT_PASSWORD}
         ME_CONFIG_MONGODB_SERVER: mongodb
         ME_CONFIG_BASICAUTH_USERNAME: admin
         ME_CONFIG_BASICAUTH_PASSWORD: admin123456
      volumes:
         - mongodb-data
      networks:
         - library-mern-api

   client:
      restart: always
      build:
         context: ./client
         dockerfile: Dockerfile
      container_name: library_mern_frontend
      volumes:
         - ./app/node_modules
         - ./client:/app
      # ports:
      #    - 3000:3000
      depends_on:
         - library-api
      networks:
         - library-mern-api

   nginx:
      restart: always
      depends_on:
         - library-api
         - client
      build:
         context: ./nginx
         dockerfile: Dockerfile
      ports:
         - 8080:80
      networks:
         - library-mern-api

networks:
   library-mern-api:
      driver: bridge

volumes:
   mongodb-data:
      driver: local
