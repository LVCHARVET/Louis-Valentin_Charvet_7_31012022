/* Import des modules */

const express = require('express')
const loginCtrl = require('../controllers/auth')
const checkToken = require('../middleware/jsonwebtoken')

/* Ajout du Router d'express */

let router = express.Router()

/* Routage Auth */

router.post('/login', loginCtrl.login)
router.post('/refresh', checkToken, loginCtrl.refresh)

module.exports = router