const member_controller = require('../api/controller/member')

module.exports = function (app, server) {
  server.get('/', member_controller.verify_member_token,(req, res) => app.render(req, res, '/index'))
  server.get('/terms', member_controller.verify_member_token,(req, res) => app.render(req, res, '/terms'))
  server.get('/privacy', member_controller.verify_member_token,(req, res) => app.render(req, res, '/privacy'))
  server.get('/dashboard', member_controller.verify_member_token,(req, res) => app.render(req, res, '/dashboard'))
  server.get('/profile', member_controller.verify_member_token,(req, res) => app.render(req, res, '/profile'))
}

function handleGame(req, res, next) {
  if(!req.cookies.currentGame) {
    res.redirect('/')
  }
  next()
}