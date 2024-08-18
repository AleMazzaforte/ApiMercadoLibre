const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const path = require('path');
const rutas =require('./rutas/mainRoutes')

const app = express();

const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,  'views'));
app.use(express.static(path.join(__dirname, 'public')));
const axios = require('axios');

app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use('/', rutas)

app.listen(port, () => {
    console.log(`Servidor escuchand en el puerto ${port}`)
})
