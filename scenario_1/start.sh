MY_IP=$(ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | head -n 1)
HOST=${MY_IP-"127.0.0.1"}
PORT=${PORT-3150}
CLIENT_PORT=${CLIENT_PORT-3010}
FRONTEND=${FRONTEND-true}
SERVER_TYPE=${SERVER_TYPE-connector}
NAME=${NAME-$SERVER_TYPE-$(hostname)}
if $FRONTEND
then
  node app.js host=$HOST port=$PORT clientPort=$CLIENT_PORT frontend=$FRONTEND serverType=$SERVER_TYPE name=$NAME
else
  node app.js host=$HOST port=$PORT frontend=$FRONTEND serverType=$SERVER_TYPE name=$NAME
fi
