/* Import des modules */

const { Sequelize } = require('sequelize')

/* Connexion à la Database */

let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false
}
)

/* Synchronisation de la DB */

// sequelize.sync(err => {
//     console.log('Database Sync Error', err)
// })

module.exports = sequelize