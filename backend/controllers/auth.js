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
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })
        
        const refreshToken = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, { expiresIn: '24h' })

        
        let simpleUser = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
        }

        return res.json({ accessToken: token, refreshToken : refreshToken, user: simpleUser })

    } catch (err) {
        next(err)
    }
}

exports.refresh = (req, res, next) => {
    User.findOne({ where: { id: req.body.id }, raw: true })
        .then((user) => {

            // ici test si user n'est pas vide

            // génération du nouveau token principal
            const token = jwt.sign({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
            }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

            return res.json({ accessToken: token })
        })
        .catch(error => res.status(500).json({ error }));
};