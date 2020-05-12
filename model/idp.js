const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { users } = require('./list_users')
const fs = require("fs")
const privateKey = fs.readFileSync('private.key');
const publicKey = fs.readFileSync('public.key');


const login = async (login_in, password_in) => {


	const user = users.filter(users => users.login===login_in)[0];
	if(!user) throw new Error('user n existe pas');
	if(!user.password) {
		throw new Error('erreur car password undefined');
	}


	const match = await bcrypt.compare(password_in, user.password);
	if(!match)
	{
		throw new Error('erreur car pas les memes mdp');
	}
	const result = await new Promise((resolve, reject) => { 
  		jwt.sign(login_in, { key: privateKey, passphrase: '' }, { algorithm: 'RS256'}, (err, token) =>{
    		if(err)
    		{
    			console.log(err)
    			reject(err);
    		} 
     		else
     		{
     			token = {
          			"access_token": token
        			} 
        		resolve(token);
        	}
  		}); 
	});
	return result;

}

const verifyaccess = async (token) => {

	const legit = await new Promise((resolve, reject) => {

		jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, res) =>{
			if(err)
			{
		    	reject()
		    }
		    else
		   	{
		    	resolve()
		    }
		});
	});
}


exports.login = login
exports.verifyaccess = verifyaccess