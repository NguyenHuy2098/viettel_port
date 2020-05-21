FROM node:lts-alpine

WORKDIR /app

COPY ./bin ./bin
COPY ./build ./build
COPY ./package.json ./
#
CMD [ "npx", "yarn",  "serve" ]

EXPOSE 5000

