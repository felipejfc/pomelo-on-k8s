var pomelo = require('pomelo');
var routeUtil = require('./util/routeUtil')
var gameLoop = require('./app/modules/gameLoop')

var app = pomelo.createApp();
app.set('name', 'pomelo-on-k8s')

app.configure('production|development', function(){
  app.set('monitorConfig',
    {
      monitor : pomelo.monitors.redismonitor,
      redisNodes: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      }
    })
})

app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    })
  app.route('game', routeUtil.game)
})

app.configure('production|development', 'gate', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    })
})

app.configure('production|development', 'game', function(){
  app.load('gameLoop', gameLoop)
})

app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});
