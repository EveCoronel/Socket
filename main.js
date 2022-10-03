const express = require('express')
const { engine } = require('express-handlebars')
const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io')
const path = require('path')
const Products = require('./model/products');
const { formatMessage } = require('./utils/utils')

const PORT = process.env.PORT || 8080

const app = express();
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const products = new Products()

// Middlewares

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// HBS

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'history.hbs',
    layoutsDir: path.resolve(__dirname, './public/views'),
    partialsDir: path.resolve(__dirname, './public/views')
}))

app.set('views', './public/views')
app.set('view engine', 'hbs')


// Routes

const serverConnected = httpServer.listen(PORT, () => {
    console.log("Server is up and running on Port", PORT)
})

serverConnected.on('error', (error) => {
    console.log(error.message)
})


const users = []
const messages = []

io.on('connection', (socket) => {
    console.log('New client connection')

    socket.emit('products-history', products.getAll());

    socket.on('newProduct', (newProduct) => {
        products.save(newProduct);
        io.sockets.emit('products-history', products.getAll());
    });

    socket.on('join-chat', (email) => {

        let newUser = {
            id: socket.id,
            email
        }

        users.push(newUser)
        console.log(users)
    })


    socket.emit('messages', messages);

    socket.on('new-message', (data) => {

        const author = users.find(user => user.id === socket.id)
        let message = formatMessage(socket.id, author.email, data)
        messages.push(message)
        io.emit('messages', messages)

    })
})

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/products', (req, res) => {
    products.save(req.body)
    res.redirect('/products')
})

app.get('*', (req, res) => {
    res.status(404).send('Página no encontrada')
})