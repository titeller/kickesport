const express = require('express')
const router = express.Router()

const member_controller = require('./controller/member')

router.post('/member', member_controller.check_member_byFacebookId,member_controller.member_post)

module.exports = router