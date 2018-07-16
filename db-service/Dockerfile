FROM node:8.4.0

RUN mkdir -p /www/db-service

COPY . /www/db-service/

WORKDIR /www/db-service/

RUN cd /www/db-service && npm install && npm install -g nodemon

ENV AMQP_HOST amqp://rabbitmq
ENV AMQP_QUEUE rpc_q
ENV DB_USER admin
ENV DB_PASSWORD admin123456


CMD [ "nodemon" , "/www/db-service/server.js" ]
