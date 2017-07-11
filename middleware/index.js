exports.handleRef = function (req, res, next) {
  if (req.query.ref) {
    res.cookie('ref', req.query.ref, {
      maxAge: getWeekMaxAge()
    });
  }
  next()
}

exports.forceSSL = function (req, res, next) {
  if (!req.secure) {
    var temphost = req.headers.host
    var host = temphost.replace(/www\./g,"")
    return res.redirect('https://' + host + req.url)
  }
  next()
}

exports.clearCache = function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache')
  next()
}

function getWeekMaxAge() {
  const week = 3600 * 1000 * 24 * 7
  return week
}