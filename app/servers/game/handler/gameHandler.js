module.exports = function(app) {
  return new Handler(app)
};

var Handler = function(app) {
  this.app = app;
};

Handler.prototype.sayHello = function(msg, session, next) {
  next(null, {code: 200, msg: 'Hello, im server ' + this.app.getCurServer().name})
}
