FROM nginx:alpine

ENV LISTEN_PORT 3010
ENV SERVICE_DOMAIN localhost
ENV K8S_SERVICE service
ENV FORWARD_PORT 3010
ENV K8S_DNS_SERVER 3010

ADD default.conf /etc/nginx/conf.d/default.conf
ADD start.sh /
RUN chmod +x /start.sh

CMD /start.sh
