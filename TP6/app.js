const express = require('express'	)
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoose = require('mongoose')
const config = require('config')
const alertRouter = require('./routes/alert-v1')
const alertModel = require ('./model/alert')
const db = config.get('db')


mongoose.connect('mongodb://'+db.host+':'+db.port+'/'+db.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false
    });



const app = express()


app.use(bodyParser.json())


// Activation de Helmet
app.use(helmet({noSniff: true}))

// On injecte le model dans les routers. Ceci permet de supprimer la dépendance
// directe entre les routers et le modele

app.use('/v1/alerts', alertRouter(alertModel))


// For unit tests
exports.app = app