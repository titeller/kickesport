const member_controller = require('../api/controller/member')

module.exports = function (app, server) {
  server.get('/', member_controller.verify_member_token,(req, res) => app.render(req, res, '/index'))
  server.get('/dashboard', member_controller.verify_member_token,(req, res) => app.render(req, res, '/dashboard'))
}
