const express = require('express')
const router = express.Router()
const passport = require('passport')

const member_controller = require('./controller/member')
const role_controller = require('./controller/role')

router.get('/steam',
  passport.authenticate('steam'),
  function(req, res) {
    // The request will be redirected to Steam for authentication, so
    // this function will not be called.
  });

router.get('/steam/return',
  passport.authenticate('steam', { failureRedirect: '/dashboard' }),
  member_controller.verify_member_token,
  function(req, res) {
    // Successful authentication, redirect home.
    if(req.user) {
      member_controller.member_steam_auth(req.member.id, req.user, function(err, data) {
        res.redirect('/dashboard');
      })
    } else {
      res.redirect('/dashboard');
    }
  });

router.post('/member', member_controller.check_member_byFacebookId, member_controller.member_post)
router.put('/member', member_controller.verify_member_token, member_controller.member_put)
router.get('/member_looking', member_controller.verify_member_token, member_controller.member_looking_get)
router.post('/member_looking', member_controller.verify_member_token, member_controller.member_looking_post)
router.get('/role', role_controller.role_get)

module.exports = router