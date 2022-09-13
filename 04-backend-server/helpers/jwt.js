const jwt = require('jsonwebtoken');

const generarJWT = (uid) => { 
    return new Promise( (resolve,reject) =>{//*Se coloca dentro de una promesa para poder usar el async-await

        //*Lo que se guarda en el localstorage
        const payload = {
            uid
        }
    
        //Crear token(firmar)
        jwt.sign(payload,process.env.JWT_SECRET,{
            //*Duración del token
            expiresIn: '12h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
        })
    } )
}


module.exports = {
    generarJWT
}