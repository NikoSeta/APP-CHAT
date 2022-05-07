const fs = require ('fs')

class Mensajeria{
    constructor(urlMEnsaje){
        this.urlMEnsaje = urlMEnsaje
        this.mensajes = []
    }
    getAll(){
        try {
            return JSON.parse(fs.readFileSync(`${this.urlMEnsaje}`, "utf-8"))
        } catch (error) {
            throw new Error(error);
        }
    };
    addMensaje(obj){
        try {
            this.array = this.getAll()
            this.contador ++;
            obj.id = this.contador
            this.array.push(obj)
            fs.writeFileSync(this.urlMEnsaje, JSON.stringify(this.mensajes))
        }
        catch (err) {
            console.log("No se pudo guardar el archivo")
        };
    }    
};

module.exports = Mensajeria;