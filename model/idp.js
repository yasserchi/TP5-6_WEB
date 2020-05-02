const bcrypt = require('bcrypt');
const users = require('./users')
const jwt = require('jsonwebtoken')
const fs = require("fs")
const privateKey = fs.readFileSync('private.key');


const login = (login, password) => {

	console.log("YYY");
	console.log(users.users[0].name)
}


const verifyaccess = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, privateKey, (err, decoded) => {
      		if(err !== null) {
        		reject()
      		} else {
        		resolve()
      		}
    	})
  	})
}




exports.login = login
exports.verifyaccess = verifyaccess