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
router.post('/login', async (req, res) => {

	const login = req.body.login;
    const password = req.body.password;

	try
	{
		const token = await idp.login(login, password);
        res.json(token)
	}
    catch(err)
    {
    	res.status(401).json(err.message)
	}
})

/* verifyaccess*/
router.get('/verifyaccess', async (req, res) => {

	const token = req.headers.authorization.split('Bearer ')[1]

  	try
  	{
  		const legit = await idp.verifyaccess(token);
    	res.status(200).json({
        		message: "Ok"
    	})
	}
    catch(err)
   	{
      	res.status(401).json({
        	message: "Unauthorized"
      	})
	}
})


/** return a closure to initialize idp */
module.exports = (model) => {
  idp = model
  return router
}
