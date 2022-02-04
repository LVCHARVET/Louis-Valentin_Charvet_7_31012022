const express = require('express')
const loginCtrl = require('../controllers/auth')

let router = express.Router()


router.post('/login', loginCtrl.login)

module.exports = router