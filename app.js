const express = require('express'	)
const bodyParser = require('body-parser')
const helmet = require('helmet')

const usersRouter = require('./routes/users-v1')
const usersModel = require('./model/users')

const authRouter = require('./routes/auth-v1')
const idpModel = require('./model/idp')

const app = express()

app.use('/v1/users', function (req, res, next) {
	const token = req.headers.authorization.split('Bearer ')[1]

	idp.verifyaccess(token)
	    .then(() => {
	    	next()
	    })
	    .catch(() => {
	    	res.status(401).json({
	    		message: "Unauthorized"
	    	})
	    })
});

app.use(bodyParser.json())

// Activation de Helmet
app.use(helmet({noSniff: true}))

// On injecte le model dans les routers. Ceci permet de supprimer la dépendance
// directe entre les routers et le modele
app.use('/v1/users', usersRouter(usersModel))
app.use('/v1/auth', authRouter(idpModel))

// For unit tests
exports.app = app