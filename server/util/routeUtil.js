var exp = module.exports

exp.game = function(session, msg, app, cb){
  var backendServerId = session.get('backendServerId')
  var servers = app.getServersByType('game')
  var numServers = servers.length
  if(numServers == 0){
    return cb(new Error('no game servers available'))
  }
  if(!backendServerId){
    var randomIdx = Math.floor(Math.random() * numServers)
    backendServerId = servers[randomIdx].serverId
    session.set('backendServerId', backendServerId)
    session.pushAll(sendServerId)
  }else{
    sendServerId()
  }
  function sendServerId(){
    return cb(null, backendServerId)
  }
}

