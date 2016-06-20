#!/bin/sh
docker build -t pomelo-on-k8s .
PORT=${PORT-3150}
CLIENT_PORT=${CLIENT_PORT-3010}
FRONTEND=${FRONTEND-true}
SERVER_TYPE=${SERVER_TYPE-connector}
MY_IP=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -n 1)

if $FRONTEND 
then
  docker run -p $PORT:$PORT -e "REDIS_HOST=${MY_IP}" -e "REDIS_PORT=6379" -e "PORT=${PORT}" -e "CLIENT_PORT=${CLIENT_PORT}" -e "FRONTEND=${FRONTEND}" -e "SERVER_TYPE=${SERVER_TYPE}" -it pomelo-on-k8s
else
  docker run -e "REDIS_HOST=${MY_IP}" -e "REDIS_PORT=6379" -e "PORT=${PORT}" -e "CLIENT_PORT=${CLIENT_PORT}" -e "FRONTEND=${FRONTEND}" -e "SERVER_TYPE=${SERVER_TYPE}" -it pomelo-on-k8s
fi
