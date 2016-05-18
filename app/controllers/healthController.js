module.exports.get = function(req, res, next) {
  res.send({ ok: true });
  next();
};
