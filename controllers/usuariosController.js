const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) =>{
res.render('crearCuenta',{
    nombrePagina: 'Crear cuenta en uptask'
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
            res.render('crearCuenta', {
                error: error.errors,
                nombrePagina: 'Crear cuenta en Uptask'
            });
    }
   
}