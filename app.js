var pomelo = require('pomelo');
var routeUtil = require('./util/routeUtil.js')

/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'pomelo-on-k8s');

// configure monitor
app.configure('production|development', function(){
  app.set('monitorConfig',
    {
      monitor : pomelo.monitors.redismonitor,
      redisNodes: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      }
    });
});

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });
  app.route('game', routeUtil.game)
});

app.configure('production|development', 'game', function(){
});


// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
