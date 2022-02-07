/* Import des modules */

const express = require('express')
const userCtrl = require('../controllers/user')

/* Ajout du Router d'express */

let router = express.Router()

/* Routage User */

router.get('/', userCtrl.getAllUsers)

router.get('/:id', userCtrl.getOneUser)

router.put('', userCtrl.addUser)

router.patch('/:id', userCtrl.updateUser)

router.post('/untrash/:id', userCtrl.untrashUser)

router.delete('/trash/:id', userCtrl.trashUser)

router.delete('/:id', userCtrl.deleteUser)

module.exports = router