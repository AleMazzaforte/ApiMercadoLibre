const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const path = require('path');

const app = express();

const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));


app.listen(port, () => {
    console.log(`Servidor escuchand en el puerto ${port}`)
})