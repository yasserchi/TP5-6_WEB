const express = require('express'	)
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoose = require('mongoose')
const config = require('config')
const alertRouter = require('./routes/alert-v1')
const alertModel = require ('./model/alert')
const db = config.get('db')
const fs = require("fs")
const publicKey = fs.readFileSync('public.key');
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://'+db.host+':'+db.port+'/'+db.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify : false
    });



const app = express()


const middleware_access = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send()
  }
  let token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, publicKey, (err, decoded) => {
    if(err !== null) {
      res.status(401).json({
        message: "Unauthorized"
      })
    } else {
      next()
    }
  })
}

app.use(middleware_access)


app.use(bodyParser.json())


// Activation de Helmet
app.use(helmet({noSniff: true}))

// On injecte le model dans les routers. Ceci permet de supprimer la dépendance
// directe entre les routers et le modele

app.use('/v1/alerts', alertRouter(alertModel))


// For unit tests
exports.app = app