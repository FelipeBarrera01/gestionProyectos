const express = require('express');
const router = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const helpers = require('./helpers');

const db = require('./config/db');
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');


db.sync().then(()=>{console.log('Conectado al servidor');}).catch( err =>{console.log(err)});

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(express.static('public'))
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use(flash());
app.use((req, res, next) =>{
    res.locals.vardump = helpers.vardump;
    next();
});

app.use('/', router());

app.listen(3000); 