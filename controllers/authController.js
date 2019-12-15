const passport = require('passport');
const Usuario = require('../models/Usuarios');
const crypto = require('crypto');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlres/email');


exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

exports.usuarioAutenticado = (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/iniciar-sesion');
}
exports.cerrarSesion = (req, res) =>{
    res.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}
exports.enviarToken = async (req, res) =>{
    const usuario = await Usuario.findOne({where: {email: req.body.email}});
    if(!usuario){
        req.flas('error', 'No existe esa cuenta');
        res.redirect('/reestablecer');
    }
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 3600000;
    await usuario.save();
    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token} `;

    await enviarEmail.enviar({
        usuario,
        subject: 'Password Reset',
        resetUrl,
        archivo: 'reestablecer-password'
    });
    req.flash('correcto', 'se envió un mensaje a tu correo');
   res.redirect('/iniciar-sesion');
}
exports.validarToken = async (req, res) =>{
   const usuario = await Usuario.findOne({where: {token: req.params.token}});
   if(!usuario){
    req.flash('error', 'No válido');
    res.redirect('/reestablecer');
   }
   res.render('resetPassword',{
       nombrePagina: 'Reestablecer contraseña'
   });
}
exports.actualizarPassword = async (req, res) =>{
    const usuario = await Usuario.findOne({
        where: {
            token: req.params.token,
            expiracion:{
                [Op.gte]: Date.now()
            }
        }
    });
    if(!usuario){
        req.flash('error', 'No válido');
        res.redirect('/reestablecer');
    }
    usuario.token = null;
    usuario.expiracion = null;
    usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    await usuario.save();
    req.flash('correcto', 'Tu password se ha modificado');
    res.redirect('/iniciar-sesion');
}