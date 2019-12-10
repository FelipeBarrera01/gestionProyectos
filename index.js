const express = require('express');
const router = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');


const helpers = require('./helpers');

const db = require('./config/db');
require('./models/Proyectos');
require('./models/Tareas');


db.sync().then(()=>{console.log('Conectado al servidor');}).catch( err =>{console.log(err)});

const app = express();
app.use(express.static('public'))
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use((req, res, next) =>{
    res.locals.vardump = helpers.vardump;
    next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', router());

app.listen(3000); 