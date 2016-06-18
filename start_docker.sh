#!/bin/sh
docker build -t pomelo-on-k8s .
MY_IP=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -n 1)
docker run -p 3010:3010 -e "REDIS_HOST=${MY_IP}" -e "REDIS_PORT=6379" -it pomelo-on-k8s
