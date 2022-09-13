const { validationResult } = require('express-validator');
 

const validarCampos = (req, res, next) => {
    //*Atrapar los errores del middleware
    const errores = validationResult(req);
    if(!errores.isEmpty()) return res.status(400).json({
        ok:false,
        errors: errores.mapped()
    });

    //*Si llega a este punto es porque no hay errores
    next();
}

module.exports = {
    validarCampos
}