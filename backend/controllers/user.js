/* Import des modules */

const User = require('../models/user')
const { RequestError, UserError } = require('../error/customError')

/* Création et export de la fonction getAllUsers */

exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => next(err))
}

/* Création et export de la fonction getOneUser */

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

/* Création et export de la fonction addUser */


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

        /* Hashage implémenté dans le models */

        // let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        // req.body.password = hash

        let simpleUser = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
        }

        user = await User.create(req.body)
        return res.json({ message: 'User Created', data: simpleUser })

    } catch (err) {
        next(err)
    }
}

/* Création et export de la fonction updateUser */

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
        
        let simpleUser = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
        }
        return res.json({ message: 'User Updated', data: simpleUser })

    } catch (err) {
        next(err)
    }
}

/* Création et export de la fonction untrashUser */

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

/* Création et export de la fonction trashUser */

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

/* Création et export de la fonction deleteUser */

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