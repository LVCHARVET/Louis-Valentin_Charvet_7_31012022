/* Import des modules */

const express = require('express')
const checkToken = require('../middleware/jsonwebtoken')
const userCtrl = require('../controllers/user')

/* Ajout du Router d'express */

let router = express.Router()

/* Routage User */

router.get('/', checkToken, userCtrl.getAllUsers)

router.get('/:id', checkToken, userCtrl.getOneUser)

router.put('', userCtrl.addUser)

router.patch('/:id', checkToken, userCtrl.updateUser)

router.post('/untrash/:id', checkToken, userCtrl.untrashUser)

router.delete('/trash/:id', checkToken, userCtrl.trashUser)

router.delete('/:id', checkToken, userCtrl.deleteUser)

module.exports = router