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
const { SQLite } = require ('./options/SQLite');
const knex = require ('knex');

//Requires
const Container = require('./components/Productos/productos');
const container = new Container(knexMariaDB);
const Mensajeria = require ('./components/Chat/chat')
const mensajes = new Mensajeria()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/productos', router);
app.use('/', express.static(__dirname + '/public'))
app.get( '/', function ( req, res ) { res.sendFile(__dirname + "/public/index.html" ) } );
app.set('view engine', 'ejs')

app.get('/productos', async function(req, res){
    let products = await container.getAll(knexMariaDB);
    res.render('index',{
        products: products
    });
});

const server = app.listen(`${PORT}`, ()=>{
    console.log(`Para ver los productos usar este link http://localhost:${PORT}/productos `);
});