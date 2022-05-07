//conexiones al servidor
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server:IOServer } = require('socket.io');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const {Router} = express;
const router = Router();
const PORT = 8080

// BBDD
const { knexMariaDB } = require ('./options/MariaDB');
const knex = require ('knex')(knexMariaDB)

//Requires
const Container = require('./components/Productos/productos');
const container = new Container(knex);
const Mensajeria = require ('./components/Chat/chat')
const mensajes = new Mensajeria('./mensajes.txt')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/productos', router);
app.use('/', express.static(__dirname + '/public'))
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/index.html")
});
app.set('view engine', 'ejs')

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

io.on('connectionMensajes', (socket) => {
    console.log('Cliente conectado en Mensajería');
    socket.emit('mensajes', mensajes.getAll());

    socket.on('nuevo-mensajes', data => {
        messages.push(data);
        io.sockets.emit('mensajes', mensajes.addMensaje());
    })
});

const server = app.listen(`${PORT}`, ()=>{
    console.log(`Para ver los productos usar este link http://localhost:${PORT}/productos `);
});