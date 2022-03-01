/* Import des modules */

const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const DB = require('../db.config')

/* Définition du modéle User */

const User = DB.define('User', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true   // Validation
        }
    },
    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i   // contrainte
    }
}, { paranoid: true })    // Soft delete

/* System de Hashage de password */

User.beforeCreate(async (user, options) => {
    let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
    user.password = hash
})

/* System de comparatif de password */

User.checkPassword = async (password, originel) => {
    return await bcrypt.compare(password, originel)
}

/* Synchronisation du Model */

// User.sync()
// User.sync({force: true})
// User.sync({alter: true})

module.exports = User