/* Import des modules */

const express = require('express')
const loginCtrl = require('../controllers/auth')

/* Ajout du Router d'express */

let router = express.Router()

/* Routage Auth */

router.post('/login', loginCtrl.login)

module.exports = router