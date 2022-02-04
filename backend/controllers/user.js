const bcrypt = require('bcrypt')
const User = require('../models/user')
const { RequestError, UserError } = require('../error/customError')

exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => next(err))
}

exports.getOneUser = async (req, res, next) => {

    try {

        let userId = parseInt(req.params.id)
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        let user = await User.findOne({ where: { id: userId }, raw: true })
        if (user === null) {
            throw new UserError('This user does not exist !', 0)
        }

        return res.json({ data: user })

    } catch (err) {
        next(err)
    }
}

exports.addUser = async (req, res, next) => {

    try {
        const { nom, prenom, email, password } = req.body
        if (!nom || !prenom || !email || !password) {
            throw new RequestError('Missing parameter')
        }

        let user = await User.findOne({ where: { email: email }, raw: true })
        if (user !== null) {
            throw new UserError(`The user ${email} already exists !`, 1)
        }

        let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        req.body.password = hash

        let User = await User.create(req.body)
        return res.json({ message: 'User Created', data: user })

    } catch (err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {

        let userId = parseInt(req.params.id)
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        let user = await User.findOne({ where: { id: userId }, raw: true })
        if (user === null) {
            throw new UserError('This user does not exist !', 0)
        }

        await User.update(req.body, { where: { id: userId } })
        return res.json({ message: 'User Updated' })

    } catch (err) {
        next(err)
    }
}

exports.untrashUser = async (req, res, next) => {
    try {
        let userId = parseInt(req.params.id)
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        await User.restore({ where: { id: userId } })
        return res.status(204).json({})

    } catch (err) {
        next(err)
    }
}

exports.trashUser = async (req, res, next) => {

    try {

        let userId = parseInt(req.params.id)
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        await User.destroy({ where: { id: userId } })
        return res.status(204).json({})

    } catch {
        next(err)
    }
}

exports.deleteUser = async (req, res, next) => {
    try {

        let userId = parseInt(req.params.id)
        if (!userId) {
            throw new RequestError('Missing parameter')
        }

        await User.destroy({ where: { id: userId }, force: true })
        return res.status(204).json({})

    } catch {
        next(err)
    }
}