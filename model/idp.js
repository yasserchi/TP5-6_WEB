const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { users } = require('./list_users')
const fs = require("fs")
const privateKey = fs.readFileSync('private.key');


const login = async (login_in, password_in) => {


	const user = users.filter(users => users.login===login_in)[2];

	if(!user) throw new Error('user n existe pas');

	if(!user.password) {
		throw new Error('erreur car password undefined');
	}

	const match = await bcrypt.compare(password_in, user.password);
	if(!match) throw new Error('erreur car pas les memes mdp');

	const result = await new Promise((resolve, reject) => { 
  		jwt.sign(login_in, privateKey, { algorithm: 'RS256'}, (err, token) =>{
    		if(err) reject(err);
     		else resolve(token);
  		}); 
	});

	return result;

}
/*	jwt.sign(login_in, privateKey, function(err, token) {
		if(err)
		{
			console.log(err)
		}
  		console.log(token);
	});*/
/*
	try{
	    var token = jwt.sign(login_in, privateKey, { algorithm: 'RS256'});
	    return token;
	}
	catch (e) {
	    throw Error("Error sign")
	}
}
*/

const verifyaccess = async (token) => {

	try{
		const legit = await jwt.verify(token, privateKey)
		return legit;
	}
	catch(e)
	{   
	    throw Error("error verify")
	}
}




exports.login = login
exports.verifyaccess = verifyaccess