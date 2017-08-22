const connection = require('../../../database').getConnection();

exports.member_post = function (username, password, email, facebook_id, first_name, last_name, picture_profile, callback) {
  var sql_params = [];
  var sql_values = [];

  if(email) {
    sql_params.push("email");
    sql_values.push(connection.escape(email));
  }
  if(username) {
    sql_params.push("username");
    sql_values.push(connection.escape(username));
  }
  if(password) {
    sql_params.push("password");
    sql_values.push(connection.escape(password));
  }
  if(facebook_id) {
    sql_params.push("facebook_id");
    sql_values.push(connection.escape(facebook_id));
  }
  if(first_name) {
    sql_params.push("first_name");
    sql_values.push(connection.escape(first_name));
  }
  if(last_name) {
    sql_params.push("last_name");
    sql_values.push(connection.escape(last_name));
  }
  if(picture_profile) {
    sql_params.push("picture_profile");
    sql_values.push(connection.escape(picture_profile));
  }

  sql_params = sql_params.join(",");
  sql_values = sql_values.join(",");

  var sql = `INSERT INTO member (${sql_params}) VALUES (${sql_values})`

  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
}

exports.member_put = function (member_id, username, first_name, last_name, picture_profile, steam_id, rov_name, callback) {
  var sql_params = [];

  if(first_name) {
    sql_params.push(`first_name=${connection.escape(first_name)}`);
  }
  if(last_name) {
    sql_params.push(`last_name=${connection.escape(last_name)}`);
  }
  if(picture_profile) {
    sql_params.push(`picture_profile=${connection.escape(picture_profile)}`);
  }
  if(steam_id) {
    sql_params.push(`steam_id=${connection.escape(steam_id)}`);
  }
  if(rov_name) {
    sql_params.push(`rov_name=${connection.escape(rov_name)}`);
  }

  sql_params = sql_params.join(",");

  var sql = `UPDATE member SET ${sql_params} where id =  ${connection.escape(member_id)}`
  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
}

exports.member_get_byId = function (id, callback) {
  var sql= `SELECT id, username, email, verify, country_code, create_date, first_name, last_name, picture_profile, steam_id, rov_name FROM member WHERE id = ${connection.escape(id)}`
  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
};

exports.member_get_byFacebookId = function (facebook_id, callback) {
  var sql=  `SELECT id, username, email, verify, country_code, create_date, first_name, last_name, picture_profile, steam_id, rov_name FROM member WHERE facebook_id = ${connection.escape(facebook_id)}`
  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
};

exports.member_looking_post = function (member_id, game_id, description, role_id, callback) {
  var sql_params = [];
  var sql_values = [];

  if(member_id) {
    sql_params.push("member_id");
    sql_values.push(connection.escape(member_id));
  }
  if(game_id) {
    sql_params.push("game_id");
    sql_values.push(connection.escape(game_id));
  }
  if(description) {
    sql_params.push("description");
    sql_values.push(connection.escape(description));
  }
  if(role_id) {
    sql_params.push("role_id");
    sql_values.push(connection.escape(role_id));
  }

  sql_params = sql_params.join(",");
  sql_values = sql_values.join(",");

  var sql = `INSERT INTO member_looking (${sql_params}) VALUES (${sql_values})`

  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
};

exports.member_looking_get = function (game_id, role_id, offset, limit, order_by, sort_by, callback) {
  var sql = `SELECT member_looking.id, member_looking.game_id, member_looking.description, member_looking.create_date, member_looking.role_id, role.name AS role_name, member.first_name, member.last_name, member.picture_profile, member.steam_id, member.rov_name FROM member_looking LEFT JOIN member ON member_looking.member_id = member.id LEFT JOIN role ON member_looking.role_id = role.id`

  var sql_params = [];
  if(game_id) {
    sql_params.push(`member_looking.game_id=${connection.escape(game_id)}`);
  }
  if(role_id) {
    sql_params.push(`member_looking.role_id=${connection.escape(role_id)}`);
  }
  if(sql_params.length > 0) {
    sql_params = sql_params.join(" AND ")
    sql += ` WHERE ${sql_params}`
  }

  if(order_by) {
    sql += ` ORDER BY member_looking.${order_by}`
    if(sort_by) {
      sql += ` ${sort_by}`
    }
  }

  if(limit) {
    sql += ` LIMIT ${limit}`
  }
  if(offset) {
    sql += ` OFFSET ${offset}`
  }

  connection.query(sql, function (err, results, fields) {
    if(err) {
      console.log(sql)
    }
    callback(err, results);
  });
};