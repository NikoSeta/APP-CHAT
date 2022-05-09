const { SQLite } = require ('../../options/SQLite');
const knex = require ('knex')(SQLite)
class Mensajeria{
    constructor(knex){
        this.knex = knex
    }
    createTableMsj = async knex => {
        await knex.schema.createTable('MensajesChat', table => {
            table.increments('id').primary();
            table.string('name')
            table.string('text')
        })
        .then(() => console.log('Tabla Mensajes creada'))
        .catch((err) => { console.log(err); throw new err })
        .finnally(()=>{
            knex.destroy();
        })
    };
    addMensaje(obj){
        knex('MensajesChat').insert(`${obj}`)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }    
};

module.exports = Mensajeria;