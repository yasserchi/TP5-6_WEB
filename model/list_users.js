const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.users   =
[
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