const express = require('express');
const router = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const helpers = require('./helpers');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
const passport = require('./config/passport');
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');


db.sync().then(()=>{console.log('Conectado al servidor');}).catch( err =>{console.log(err)});

const app = express();
app.use(express.static('public'))
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());

app.set('views', path.join(__dirname, './views'));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) =>{
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    next();
});

app.use('/', router());

app.listen(3000); 