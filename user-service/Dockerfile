FROM node:8.4.0

RUN mkdir -p /www/user-service

COPY . /www/user-service/

WORKDIR /www/user-service/

RUN cd /www/user-service && npm install && npm install -g nodemon

ENV AMQP_HOST amqp://rabbitmq
ENV AMQP_QUEUE rpc_q
ENV PORT 3000

EXPOSE 3000

CMD [ "nodemon" , "/www/user-service/server.js" ]
