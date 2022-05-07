const knexMariaDB = require ('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'MariaDB',
        password: '',
        databas: 'myApp'
    },
    pool: { min: 0, max: 7 }
});

module.exports ={ knexMariaDB };