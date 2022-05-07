const fs = require ('fs')


class Container{
    constructor(url, knex){
        this.url = url
        this.knex = knex
        this.contador= 0;
        this.array = []
    }
    createTableProd = async knex => {
        await knex.schema.createTable('Productos', table => {
            table.increments('id').primary();
            table.string('name')
            table.integer('price')
            table.string('url')
            .then(() => console.log('Tabla creada'))
        })
    }



    getAll(){
        try {
            return JSON.parse(fs.readFileSync(`${this.url}`, "utf-8"))
        } catch (error) {
            throw new Error(error);
        }
    }
    getById(id){
            let arrayProducts =  this.getAll();
            return arrayProducts.find(product => product.id === id); 
    }
    addProd(obj){
        try {
            this.array = this.getAll()
            this.contador ++;
            obj.id = this.contador
            this.array.push(obj)
            fs.writeFileSync(this.url, JSON.stringify(this.array))
        }
        catch (err) {
            console.log("No se pudo guardar el archivo")
        }
    }
    async modifyProd(id){
        let array = await this.getAll();
        let modifyProd = array.map(p => p.id === id ? { ...p, nombre: "Lapiz de color", precio: 11, url: " " } : p);
        fs.appendFileSync.splice(`${this.url}`, `${modifyProd}`);
        return 
    }
    async deleteById(id){
        let deleteId = await this.getAll();
        return deleteId.splice(2,`${id}`);
    }
};

module.exports = Container;