const mongoose = require('mongoose');

//*Funcion que al llamarla se encargará de establecer la conexió con la base de datos
const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN);
        console.log("Base de datos arriba")
        
    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD')
    }
}

module.exports = {
    dbConnection
}