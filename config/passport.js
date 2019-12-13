const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuarios = require('../models/Usuarios');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done)=>{
            try {
                const usuario = await Usuarios.find({
                    where:{
                        email: email
                    }
                });
                if(!usuario.verificarPassword(password)){
                    
                }
            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe '
                });
            }
        }
    )
)