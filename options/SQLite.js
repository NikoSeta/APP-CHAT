const knexSQLite = require ('knex')({
    cliente: 'sqlite3',
    connection: { filename:'./' }
});

module.exports ={ knexSQLite }