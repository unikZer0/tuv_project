const express = require('express')
const router = express()
const auth = require('../controller/auth/auth')

router.post('/login',auth.loginCtrl)

module.exports = router
