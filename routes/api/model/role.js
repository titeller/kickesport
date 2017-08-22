const connection = require('../../../database').getConnection();

exports.role_get = function (game_id, callback) {
  var sql_params = [];
  if(game_id) {
    sql_params.push(`game_id = ${connection.escape(game_id)}`)
  }

  var sql = `SELECT id, name, game_id, status FROM role`

  if(sql_params.length > 0) {
    sql_params = sql_params.join(' AND ');
    sql += ` WHERE ${sql_params}`
  }

  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
}