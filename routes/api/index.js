const express = require('express')
const router = express.Router()

const member_controller = require('./controller/member')
const role_controller = require('./controller/role')

router.post('/member', member_controller.check_member_byFacebookId, member_controller.member_post)
router.put('/member', member_controller.verify_member_token, member_controller.member_put)
router.get('/member_looking', member_controller.verify_member_token, member_controller.member_looking_get)
router.post('/member_looking', member_controller.verify_member_token, member_controller.member_looking_post)
router.get('/role', role_controller.role_get)

module.exports = router