/* Import des modules */

const express = require('express')
const cors = require('cors')
const checkToken = require('./middleware/jsonwebtoken')
const errorHandler = require('./error/errorHandler')

/* Import de la connexion à la Database */

let DB = require('./db.config')

/* Initialisation de l'API */

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Import des modules de routage */

const user_router = require('./routes/users')
const auth_router = require('./routes/auth')

/* Mise en place du routage */

app.get('/', (req, res) => res.send("I'm online, well done"))

app.use('/users', /*checkToken,*/ user_router)
app.use('/auth', auth_router)

app.get('*', (req, res) => res.status(501).send("What the hell are you doing !?!"))

/* Mise en place du system de gestion des erreurs */

app.use(errorHandler)

/* Démarrage du serveur */

DB.authenticate()
    .then(() => console.log("Database connection OK"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}. Have fun !`)
        })
    })
    .catch(err => console.log("Database Error", err))