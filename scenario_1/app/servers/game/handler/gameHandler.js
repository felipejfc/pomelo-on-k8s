var logger = require('pomelo-logger').getLogger('gameHandler')

module.exports = function(app) {
  return new Handler(app)
};

var Handler = function(app) {
  this.app = app
  this.gameLoop = this.app.components['gameLoop']
};

Handler.prototype.spawn = function(message, session, next){
  var uid = session.uid
  var frontendId = session.frontendId
  if(!uid){
    return next(new Error('cant spawn with no uid binded'))
  }
  logger.debug("player", uid, "entered game, adding him to game loop channel")
  this.gameLoop.addPlayer(uid, frontendId)
  next(null, {status: 200})
}

Handler.prototype.sayHello = function(msg, session, next){
  return next(null, {code: 200, msg: "hello from server: " + this.app.getCurServer().name})
}

