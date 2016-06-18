FROM mhart/alpine-node:latest

EXPOSE 3010

RUN mkdir -p /var/apps/pomelo-on-k8s
WORKDIR /var/apps/pomelo-on-k8s
ADD package.json /var/apps/pomelo-on-k8s/package.json
RUN npm install
COPY . /var/apps/pomelo-on-k8s

ENV REDIS_HOST 127.0.0.1
ENV REDIS_PORT 6379

CMD ./start.sh
