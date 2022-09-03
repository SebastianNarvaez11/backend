const { response } = require('express')
const { validationResult } = require('express-validator')


//middleware que revisa si los checks de la ruta tienen algun error capturado
const validateFields = (req, res = response, next) => {

    //validamos si los middlewares de la ruta encontraron errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next()
}

module.exports = {
    validateFields
}