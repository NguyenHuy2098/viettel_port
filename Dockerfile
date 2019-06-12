FROM node:lts-alpine

WORKDIR /app

COPY ./bin ./bin
COPY ./build ./build
COPY ./package.json ./

RUN chmod +x ./bin/entrypoint.sh

CMD [ "./bin/entrypoint.sh" ]

EXPOSE 5000
