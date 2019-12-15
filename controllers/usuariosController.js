const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlres/email');
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
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email} `;
        const usuario = {

            email
        }
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta Upstak',
            confirmarUrl,
            archivo: 'reestablecer-password'
        });
        req.flash('correcto', 'Enviamos un correo, confirma tu cuenta');
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
exports.formRestablecerPassword = (req, res) =>{
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer tu contraseña'
    });
}
exports.confirmarCuenta = async (req,res) =>{
    const usuario = await Usuarios.findOne({
        where:{
            email: req.params.correo
        }
    });
    if(!usuario){
        req.flash('error', 'No valido');
        res.rediret('/crear-cuenta');
    }
    usuario.activo = 1;
    await usuario.save();
    req.flash('correcto', 'cuenta activada');
    res.rediret('/iniciar-sesion');
}