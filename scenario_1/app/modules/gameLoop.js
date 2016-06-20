var logger = require('pomelo-logger').getLogger('game')
var channelUtil = require('../../util/channelUtil.js')

module.exports = function(app, opts) {
  return new GameLoop(app, opts)
}

var GameLoop = function(app, opts) {
  this.app = app
  this.players = {}
  this.tickInterval = 50
  this.tick = 0
}

GameLoop.name = '__GameLoop__'

GameLoop.prototype.start = function(cb) {
  process.nextTick(cb)
}

GameLoop.prototype.addPlayer = function(uid, frontendId) {
  this.players[uid] = {}
  this.channel.add(uid, frontendId)
}

GameLoop.prototype.removePlayer = function(uid, frontendId) {
  delete this.players[uid]
  this.channel.leave(uid, frontendId)
}

GameLoop.prototype.afterStart = function(cb){
  this.channel = this.app.get('channelService').getChannel(channelUtil.getChannelName(this.app.serverId), true)
  setInterval(this.mainLoop.bind(this), this.tickInterval)
  process.nextTick(cb)
}

GameLoop.prototype.mainLoop = function(){
  if(Object.keys(this.players).length == 0){
    this.tick = 0
    return
  }

  this.channel.pushMessage('tick', {tick: this.tick++, message:"test message"})
}
