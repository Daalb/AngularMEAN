const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req,res) => {

    const usuarios = await Usuario.find({},'nombre email rol google');

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    })
}


const crearUsuario = async (req,res) => {
    const{ email, password } = req.body; 
    try{

        //*Verificar si existe o no un email
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail) return res.status(400).json({
            ok: false,
            msg: 'El correo ya está registrado'
        })


        //*Si no existe el email proceder a crear un usuario
        const usuario = new Usuario(req.body);
        
        //*Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //*Se guarda el usuario creado 
        await usuario.save();

        //*Geerar el TOKEN - JWT
        const token = await generarJWT( usuario.id) ;
    
        res.json({
            ok: true,
            usuario,
            token
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

   
}



const actualizarUsuario = async(req,res) => {
    const uid = req.params.id;

    try{
        //*Verificar si existe el usuario a actualizar
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async(req,res) => {
    const uid = req.params.id;
    try{
        //*Verificar si existe el usuario a actualizar
        const usuarioDB = await Usuario.findById(uid);
        if(!usuarioDB) return res.status(404).json({
            ok: false,
            msg: 'No existe un usuario por ese id'
        });

        //*Si existe se elimina
        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Eliminando '
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con admin'
        })
    }
    console.log('Eliminando')
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}