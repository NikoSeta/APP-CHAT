const { knexMariaDB } = require ('../../options/MariaDB');
const knex = require ('knex')(knexMariaDB)

class Container{
    constructor(knex){
        this.knex = knex
    }
    createTableProd = async knex => {
        await knex.schema.createTable('Productos', table => {
            table.increments('id').primary();
            table.string('name')
            table.integer('price')
            table.string('url')
        })
        .then(() => console.log('Tabla Productos creada'))
        .catch((err) => { console.log(err); throw new err })
        .finnally(()=>{
            knex.destroy();
        })
    };
    getAll = (knex) => {
        if(this.createTableProd = null){
            console.log('No hay tabla creada');
        }else{
            knex.from('Productos').select('id', 'name', 'price', 'url')
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
            .finnally(()=>{
                knex.destroy();
            })
        }
    }

    getById(id){
        knex.from('Productos').select(`${id}`)
        .then((rows) =>{
            for (row of rows){
                console.log(`${row['id']} ${row['name']} ${row['price']} ${row['url']}`);
            }
        })
        .catch((err) => {
            console.log(err);
        })
        .finnally(()=>{
            knex.destroy();
        })
    }

    addProd(obj){
        knex('Productos').insert(`${obj}`)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    async modifyProd(id, updateProd){
        await knex('Productos').where(`${id}`).update(`${updateProd}`)
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }

    async deleteById(id){
         await knex('Productos').del()
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
    }
};

module.exports = Container;