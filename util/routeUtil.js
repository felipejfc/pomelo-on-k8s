var exp = module.exports

exp.game = function(session, msg, app, cb){
  var serverId = session.get('serverId')
  var servers = app.getServersByType('game')
  var numServers = servers.length
  if(numServers == 0){
    return cb(new Error('no game servers available'))
  }
  if(!serverId){
    var randomIdx = Math.floor(Math.random() * numServers)
    serverId = servers[randomIdx].serverId
    session.set('serverId', serverId)
    session.pushAll(sendServerId)
  }else{
    sendServerId()
  }
  function sendServerId(){
    return cb(null, serverId)
  }
}

