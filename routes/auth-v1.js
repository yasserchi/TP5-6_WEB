const express = require('express')
const router = express.Router()
const truc = require('../model/idp')

let idp = undefined

/* Control usermodel initialisation */
router.use((req, res, next) => {
  /* istanbul ignore if */
  if (!idp) {
    res
      .status(500)
      .json({message: 'idp not initialised'})
  }
  next()
})

/* login */
router.post('/login', function (req, res) {

  	login = req.body.login;
  	password = req.body.password;

  	idp.login(login, password)
    	.then((result) => {
      		res.json(result)
    	})
    	.catch((result) => {
      		res.status(401).json(result)
    	})
})

/* verifyaccess*/
router.get('/verifyaccess', function (req, res) {

	if (!req.headers.authorization) {
    	return res.status(401).send()
  	}

  	let token = req.headers.authorization.split(' ')[1]
  	idp.verifyaccess(token)
    	.then(() => {
      		res.status(200).json({
        		message: "Ok"
      		})
    	})
    	.catch(() => {
      		res.status(401).json({
        		message: "Unauthorized",
        		type: "Unauthorized",
        		code: 0
      		})
   	 	})	
})


/** return a closure to initialize idp */
module.exports = (model) => {
  idp = model
  return router
}
