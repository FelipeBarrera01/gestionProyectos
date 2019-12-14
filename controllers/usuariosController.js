const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) =>{
res.render('crearCuenta',{
    nombrePagina: 'Crear cuenta en uptask'
});
}
exports.formIniciarSesion = (req, res) =>{
    const {error} = res.locals.mensajes;
    res.render('iniciarSesion',{
        nombrePagina: 'Iniciar Sesión en Uptask',
        error
    });
    }
exports.crearCuenta = async (req, res) => {
    const {email, password } = req.body;
    try {
        await Usuarios.create({
            emial,
            password
        });
        res.rediret('/iniciar-sesion');
    } catch (error) {
            req.flash('error',error.errors.map(error => error.message) );
            res.render('crearCuenta', {
                error:req.flash() ,
                nombrePagina: 'Crear cuenta en Uptask',
                email,
                password
            });
    }
   
}