var logger = require('pomelo-logger').getLogger('entryHandler')

module.exports = function(app) {
  return new Handler(app)
};

var Handler = function(app) {
  this.app = app
  this.uid = 1
};

Handler.prototype.enter = function(msg, session, next) {
  if(session.uid){
    return next(null, {uid: session.uid})
  }
  var uid = this.uid++
  session.bind(uid) 
  session.on('closed', onPlayerLeave.bind(null, this.app))
  session.pushAll(() => {
    return next(null, {uid: uid})
  })
}

Handler.prototype.sayHello = function(msg, session, next){
  return next(null, {code: 200, msg: "hello from server: " + this.app.getCurServer().name})
}

var onPlayerLeave = function(app, session){
  logger.debug('player', session.uid, 'left')
  var rpc = app.rpc
  rpc.game.gameRemote.playerLeave(session, session.uid, session.frontendId, null)
}

