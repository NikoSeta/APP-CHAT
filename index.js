const fs = require ('fs')
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const {Router} = express;
const router = Router();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/productos', router);
app.use('/', express.static(__dirname + '/public'))
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html")
});
app.set('view engine', 'ejs')

const server = app.listen(`${PORT}`, ()=>{
    console.log(`Para ver los productos usar este link http://localhost:${PORT}/productos `);
});


class Container{
    constructor(url){
        this.url = url
        this.contador= 0;
        this.array = []
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
let container = new Container('./productos.txt');

app.get('/productos', function(req, res){
    let products = container.getAll()
    res.render('index',{
        products: products
    })
});

app.post('/productos', function(req, res){
    try {
        let newProduct = req.body
        container.addProd(newProduct)
        res.redirect("/productos")
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
});

io.on('connection', socket => {
    console.log('Cliente conetado en Producto');
    const products = container.getAll();
    socket.emit('products', products);

    socket.on('new-product', data => {
        products.push(data);
        io.sockets.emit('products', products);
    })
});


// <---Mensajes---> //
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

let mensajes = new Mensajeria('./mensajes.txt')

io.on('connectionMensajes', (socket) => {
    console.log('Cliente conectado en Mensajería');
    socket.emit('mensajes', mensajes.getAll());

    socket.on('nuevo-mensajes', data => {
        messages.push(data);
        io.sockets.emit('mensajes', mensajes.addMensaje());
    })
});