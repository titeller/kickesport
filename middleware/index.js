exports.handleRef = function (req, res, next) {
  if (req.query.ref) {
    res.cookie('ref', req.query.ref, {
      maxAge: getWeekMaxAge()
    });
  }
  next()
}

exports.forceSSL = function (req, res, next) {
  var host = req.headers.host || ''
  // console.log('req.headers.host', req.headers.host)
  // if (host && host.match(/^www/) !== null) {
  //   console.log('host', host)
  //   host = host.replace(/^www\./, '')
  //   return res.redirect('https://' + host + req.url)
  // }
  if (!req.secure && host) {
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