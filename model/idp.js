const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { users } = require('./list_users')
const fs = require("fs")
const privateKey = fs.readFileSync('private.key');


const login = (login_in, password_in) => {
	return new Promise(async (resolve, reject) => {
	    let user_exist = false

	    for(user of users) {
	    	let { login } = user;
	    	//console.log("login_in = " + login_in)
	      	//console.log("login =" + login)
	      	if(login === login_in) {
	        	user_exist = true
	        	//console.log("password_in = " + password_in)
	      		//console.log("login =" + login)
	        	if(user.password === undefined) {
	        		console.log("error1")
	         		return reject(new Error('erreur car password undefined'))
	        	}
	        	let hashed_password = user.password
	        	console.log(hashed_password)
	        	console.log(password_in)
	 			try{
		        	let samePass = await bcrypt.compare(password_in, user.password)
		        	if(!samePass) {
		        		console.log("error2")
		            	return reject(new Error('erreur car pas les memes mdp(mais ça n arrive jamais ici'))
		        	}
		        }
		        catch(err){
		        	console.log("error3")
		        	return reject(new Error('erreur au catch'))
		        }
	    
	      	}
	    }

	    if(!user_exist) {
	    	console.log("error4")
	      	return reject(new Error('user n existe pas'))
	    }
	    resolve
		Promise.reject(new Error('si on arrive ici, ca marche, a completer'))
	})
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