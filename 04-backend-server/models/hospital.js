const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,//*Indica una relación entre usuario y hospital
        ref: 'Usuario'
    }
}, {  collection: 'hospitales' });//*Permite especificar un nombre. Sino se coloca mongoose coloca un nombre


HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Hospital', HospitalSchema );