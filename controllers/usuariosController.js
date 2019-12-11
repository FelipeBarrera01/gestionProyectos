const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) =>{
res.render('crearCuenta',{
    nombrePagina: 'Crear cuenta en uptask'
});
}
exports.crearCuenta = (req, res) => {
    const {email, password } = req.body;
    Usuarios.create({
        emial,
        password
    }).then(()=>{
        res.rediret('/iniciar-sesion');
    });
}