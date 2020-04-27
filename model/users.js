const uuidv1 = require('uuid/v1')
const tcomb = require('tcomb')
const bcrypt = require('bcrypt');

const saltRounds = 10;

const USER = tcomb.struct({
    id: tcomb.String,
    name: tcomb.String,
    login: tcomb.String,
    password: tcomb.String,
    age: tcomb.Number
}, {strict: true})

const users = [
    {
        id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        name: 'Pedro Ramirez',
        login: 'pedro',
        password: bcrypt.hash('pedro_mdp', saltRounds),
        age: 44
    }, {
        id: '456897d-98a8-78d8-4565-2d42b21b1a3e',
        name: 'Jesse Jones',
        login: 'jesse',
        password: bcrypt.hash('jesse_mdp', saltRounds),
        age: 48
    }, {
        id: '987sd88a-45q6-78d8-4565-2d42b21b1a3e',
        name: 'Rose Doolan',
        login: 'rose',
        password: bcrypt.hash('rose_mdp', saltRounds),
        age: 36
    }, {
        id: '654de540-877a-65e5-4565-2d42b21b1a3e',
        name: 'Sid Ketchum',
        login: 'sid',
        password: bcrypt.hash('sid_mdp', saltRounds),
        age: 56
    }
]

const get = (id) => {
    const usersFound = users.filter((user) => user.id === id)
    return usersFound.length >= 1
        ? usersFound[0]
        : undefined
}

const getAll = () => {
    return users
}

//a modif avec le password
const add = async (user) => {
    //on prend le mot de passe de la requete envoye en dur puis on la hash pour stocker dans la bdd
   const hash = await bcrypt.hash(user.password, saltRounds) 
    const newUser = {
        ...user,
        id: uuidv1(),
        password: hash
    }
    if (validateUser(newUser)) {
        users.push(newUser)
    } else {
        throw new Error('user.not.valid')
    }
    return newUser;
}

/*//a modif avec le password
const add = (user) => {
    //on prend le mot de passe de la requete envoye en dur puis on la hash pour stocker dans la bdd
    
    console.log(user.password)
    bcrypt.hash(user.password, 10, function(err, hash) {
        if(err){
            throw err;
        }  
        const newUser = {
            ...user,
            id: uuidv1(),
            password: hash
    }

    })

        if (validateUser(newUser)) {
        users.push(newUser)
    } else {
        throw new Error('user.not.valid')
    }
    return newUser;
}*/


//a modif avec le password (pas du tout bon)
const update = (id, newUserProperties) => {
    const usersFound = users.filter((user) => user.id === id)

    if (usersFound.length === 1) {
        const oldUser = usersFound[0]

        //comme pour le add, il faut hash le password si il est dans newUserProperties
        if (newUserProperties.password) {
            newUserProperties.password = bcrypt.hash(newUserProperties.password, saltRounds)
        }

        const newUser = {
            ...oldUser,
            ...newUserProperties
        }

        // Control data to patch
        if (validateUser(newUser)) {
            // Object.assign permet d'éviter la suppression de l'ancien élément puis l'ajout
            // du nouveau Il assigne à l'ancien objet toutes les propriétés du nouveau
            Object.assign(oldUser, newUser)
            return oldUser
        } else {
            throw new Error('user.not.valid')
        }
    } else {
        throw new Error('user.not.found')
    }
}

const remove = (id) => {
    const indexFound = users.findIndex((user) => user.id === id)
    if (indexFound > -1) {
        users.splice(indexFound, 1)
    } else {
        throw new Error('user.not.found')
    }
}

function validateUser(user) {
    let result = false
    /* istanbul ignore else */
    if (user) {
        try {
            const tcombUser = USER(user)
            result = true
        } catch (exc) {
            result = false
        }
    }
    return result
}

exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove