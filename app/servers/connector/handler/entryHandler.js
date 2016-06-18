module.exports = function(app) {
  return new Handler(app);
};

var Handler = function(app) {
  this.app = app;
};

Handler.prototype.entry = function(msg, session, next) {
  next(null, {code: 200, msg: 'Welcome to pomelo 2.0.'});
};

