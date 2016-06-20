var logger = require('pomelo-logger').getLogger('gameRemote')
var channelUtil = require('../../../../util/channelUtil')

module.exports = function(app){
  return new GameRemote(app)
}

var GameRemote = function(app){
  this.app = app
  this.channel = this.app.get('channelService').getChannel(channelUtil.getChannelName(this.app.serverId), true)
  this.gameLoop = this.app.components['gameLoop']
}

GameRemote.prototype.playerLeave = function(uid, frontendId, cb){
  logger.debug("player", uid, "left the game, removing him from game loop channel")
  this.gameLoop.removePlayer(uid, frontendId)
  if(cb){
    cb()
  }
}

