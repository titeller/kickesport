const role_model = require('../model/role')

exports.role_get = function (req, res) {
  var game_id = req.query.game_id;
  role_model.role_get(game_id, function (err, data) {
    if (!err) {
      res.send({
        status: true,
        data: data
      })
    } else {
      res.send({
        status: false,
        message: err.message
      });
    }
  })
}