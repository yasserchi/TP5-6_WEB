const uuidv1 = require('uuid/v1')
const tcomb = require('tcomb')
const bcrypt = require('bcrypt');
const { users } = require('./list_users')

const saltRounds = 10;

const USER = tcomb.struct({
    id: tcomb.String,
    name: tcomb.String,
    login: tcomb.String,
    password: tcomb.String,
    age: tcomb.Number
}, {strict: true})


const get = (id) => {
    const usersFound = users.filter((user) => user.id === id)
    return usersFound.length >= 1
        ? usersFound[0]
        : undefined
}

const getAll = () => {
    return users
}

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

const update = async (id, newUserProperties) => {
    const usersFound = users.filter((user) => user.id === id)

    if (usersFound.length === 1) {
        const oldUser = usersFound[0]

        //comme pour le add, il faut hash le password si il est dans newUserProperties
        if (newUserProperties.password) {
            newUserProperties.password = await bcrypt.hash(newUserProperties.password, saltRounds)
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

exports.users = users
exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove