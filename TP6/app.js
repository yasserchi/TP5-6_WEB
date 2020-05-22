const express = require('express'	)
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoose = require('mongoose')
const config = require('config')


const { port: db_port, host: db_host, name: db_name, username: db_username, password: db_password } = config.get('db')

if(db_username !== "" && db_password !== "") {
  mongoose.connect(`mongodb://${db_username}:${db_password}@${db_host}:${db_port}/${db_name}`, {useNewUrlParser: true});
} else {
  mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`, {useNewUrlParser: true});
}


const app = express()


app.use(bodyParser.json())


// Activation de Helmet
app.use(helmet({noSniff: true}))

// On injecte le model dans les routers. Ceci permet de supprimer la dépendance
// directe entre les routers et le modele
// à faire une fois model et routes fait

// For unit tests
exports.app = app