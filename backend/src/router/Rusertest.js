const express = require('express')
const router = express()
const getUsers = require('../controller/testuser/userCtrl');


router.get('/',getUsers.getAll);

module.exports = router
