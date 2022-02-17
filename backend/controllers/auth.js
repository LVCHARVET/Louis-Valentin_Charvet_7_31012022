/* Import des modules */

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { AuthenticationError } = require('../error/customError')

/* Création et export de la fonction login */

exports.login = async (req, res, next) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new AuthenticationError('Bad email or password', 0)
        }

        let user = await User.findOne({ where: { email: email }, raw: true })
        if (user === null) {
            throw new AuthenticationError('This account does not exists !', 1)
        }

        /* System de compratif implémenté dans le models */

        // let test = await bcrypt.compare(password, user.password)

        let test = await User.checkPassword(password, user.password)
        if (!test) {
            throw new AuthenticationError('Wrong password', 2)
        }

        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })
        
        let simpleUser = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }

        return res.json({ access_token: token, user: simpleUser })

    } catch (err) {
        next(err)
    }
}