const knexSQLite = require ('knex')({
    cliente: 'sqlite3',
    connection: { filename:'./DB/chat.sqlite' }
});

module.exports ={ knexSQLite }