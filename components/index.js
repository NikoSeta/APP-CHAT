




const createTableMsj = async knex => {
    await knex.schema.createTable('Productos', table => {
        table.increments('id').primary();
        table.string('name')
        table.string('text')
        .then(() => console.log('Tabla creada'))
    })
}

