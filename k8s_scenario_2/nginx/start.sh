#!/bin/sh

sed -i "s/{{LISTEN_PORT}}/${LISTEN_PORT}/g" /etc/nginx/conf.d/default.conf
sed -i "s/{{SERVICE_DOMAIN}}/${SERVICE_DOMAIN}/g" /etc/nginx/conf.d/default.conf
sed -i "s/{{K8S_SERVICE}}/${K8S_SERVICE}/g" /etc/nginx/conf.d/default.conf
sed -i "s/{{K8S_DNS_SERVER}}/${K8S_DNS_SERVER}/g" /etc/nginx/conf.d/default.conf
sed -i "s/{{FORWARD_PORT}}/${FORWARD_PORT}/g" /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
