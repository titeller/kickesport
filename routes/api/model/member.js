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

  var sql = "INSERT INTO member (" + sql_params + ") VALUES (" + sql_values + ")";

  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
}

exports.member_get_byId = function (id, callback) {
  var sql= "SELECT id, username, email, verify, country_code, create_date, first_name, last_name, picture_profile FROM member WHERE id = " + connection.escape(id);
  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
};

exports.member_get_byFacebookId = function (facebook_id, callback) {
  var sql= "SELECT id, username, email, verify, country_code, create_date, first_name, last_name, picture_profile FROM member WHERE facebook_id = " + connection.escape(facebook_id);
  connection.query(sql, function (err, results, fields) {
    callback(err, results);
  });
};