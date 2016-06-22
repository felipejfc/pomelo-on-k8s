var logger = require('pomelo-logger').getLogger('gateHandler')

module.exports = function(app) {
  return new Handler(app)
};

var Handler = function(app) {
  this.app = app
};

Handler.prototype.getConnector = function(msg, session, next){
  var connectors = this.app.getServersByType('connector')
  if(!connectors || connectors.length == 0){
    return next(new Error('no connector available'))
  }
  var randomIdx = Math.floor(Math.random() * connectors.length)
  var server = connectors[randomIdx]
  next(null, {host: server.clientHost, port: server.clientPort})
}

