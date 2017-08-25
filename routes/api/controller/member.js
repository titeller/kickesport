const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const member_model = require('../model/member')
const appSecret = require('../../../config/secret-key')
const cookieName = require('../../../config/cookie-name')

exports.member_post = function (req, res) {
  var username;
  var password;
  var email;
  var facebook_id;
  var first_name;
  var last_name;
  var picture_profile;

  if(req.body.username) {
    username = req.body.username
  }
  if(req.body.password) {
    password = req.body.password
  }
  if(req.body.email) {
    email = req.body.email
  }
  if(req.body.facebook_id) {
    facebook_id = req.body.facebook_id
  }
  if(req.body.first_name) {
    first_name = req.body.first_name
  }
  if(req.body.last_name) {
    last_name = req.body.last_name
  }
  if(req.body.picture_profile) {
    picture_profile = req.body.picture_profile
  }

  bcrypt.hash(new Date().getTime().toString(), 10, function(err, hash) {
    member_model.member_post(username, hash, email, facebook_id, first_name, last_name, picture_profile, function (err, data) {
      if (!err) {
        member_model.member_get_byId(data.insertId, function(err, data) {
          var token = jwt.sign(data[0], appSecret, { expiresIn: 3600 * 1000 * 24 });

          res.cookie(cookieName.getMemberToken, token, {
            maxAge: 3600 * 1000 * 24 * 365 // 1 year
          });

          res.send({
            status: true,
            data: {
              token: token
            }
          });
        });
      } else {
        console.log('member post error')
        console.log(err);
        res.send({
          status: false,
          message: err.message
        });
      }
    });
  });
}

exports.member_steam_auth = function (member_id, steam_profile, callback) {
  var steam_id = steam_profile._json.steamid;
  console.log(member_id, steam_id)
  member_model.member_put(member_id, null, null, null, null, steam_id, null, callback);
};

exports.member_put = function (req, res) {
  var username;
  var email;
  var first_name;
  var last_name;
  var picture_profile;
  var steam_id;
  var rov_name;

  if(req.body.username) {
    username = req.body.username
  }
  if(req.body.email) {
    email = req.body.email
  }
  if(req.body.first_name) {
    first_name = req.body.first_name
  }
  if(req.body.last_name) {
    last_name = req.body.last_name
  }
  if(req.body.picture_profile) {
    picture_profile = req.body.picture_profile
  }
  if(req.body.steam_id) {
    steam_id = req.body.steam_id
  }
  if(req.body.rov_name) {
    rov_name = req.body.rov_name
  }

  member_model.member_put(req.member.id, username, first_name, last_name, picture_profile, steam_id, rov_name, function (err, data) {
    if (!err) {
      res.send({
        status: true,
        message: 'Update success'
      })
    } else {
      res.send({
        status: false,
        message: err.message
      });
    }
  })
}

exports.check_member_byFacebookId = function (req, res, next) {
  if(req.body.facebook_id) {
    member_model.member_get_byFacebookId(req.body.facebook_id, function (err, data) {
      if(!err) {
        if(data && data[0]) {
          var token = jwt.sign(data[0], appSecret, { expiresIn: 3600 * 1000 * 24 });

          res.cookie(cookieName.getMemberToken, token, {
            maxAge: 3600 * 1000 * 24 * 365 // 1 year
          });

          res.send({
            status: true,
            data: {
              token: token
            }
          });
        } else {
          next()
        }
      } else {
        console.log(err)
        res.send({
          status: false,
          error: err
        })
      }
    })
  } else {
    res.send({
      status: false,
      message: 'require params'
    })
  }
}

exports.verify_member_token = function (req, res, next) {
  jwt.verify(req.cookies.kickesportToken || '', appSecret, function (err, decoded) {
    if(!err) {
      res.cookie(cookieName.getMemberToken, req.cookies.kickesportToken, {
        maxAge: 3600 * 1000 * 24 * 365 // 1 year
      });
      member_model.member_get_byId(decoded.id, function (err, data) {
        if(data && data.length > 0) {
          req.member = data[0];
        }
        next();
      });
    } else {
      if(err.name == 'TokenExpiredError') {
        var originalDecoded = jwt.decode(req.cookies.kickesportToken, {complete: true});
        var refreshed_token = jwt_refresh.refresh(originalDecoded, 3600 * 1000 * 24, secret_key.auth);
        jwt.verify(refreshed_token, secret_key.auth, function(err, decoded) {
          res.cookie(cookieName.getMemberToken, refreshed_token, {
            maxAge: 3600 * 1000 * 24 * 365 // 1 year
          });
          member_model.get_member_byId(decoded.id, function (err, data) {
            req.member = data[0];
            next();
          });
        });
      } else {
        next();
      }
    }
  })
}

exports.member_looking_post = function (req, res) {
  var game_id = req.body.game_id;
  var description = req.body.description;
  var role_id = req.body.role_id;

  member_model.member_looking_post(req.member.id, game_id, description, role_id, function (err, data) {
    if (!err) {
      res.send({
        status: true,
        message: 'Post member looking team success.'
      })
    } else {
      res.send({
        status: false,
        message: err.message
      });
    }
  })
}

exports.member_looking_get = function (req, res) {
  member_model.member_looking_get(req.query.game_id, req.query.role_id, req.query.offset, req.query.limit, req.query.order_by, req.query.sort_by, req.query.looking_status, function(err, data) {
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