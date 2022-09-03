const Grade = require("../models/Grade")

const existGrade = async (req, res = response, next) => {

    const { id } = req.params

    const grade = await Grade.findById(id)
    if (!grade) {
        return res.status(400).json({
            errors: [{ msg: `El grado seleccionado no existe, seleccione otro` }]
        })
    }

    next()
}


const scheduleValidate = async (req, res = response, next) => {

    const { schedule } = req.params

    const types_valid = [1, 2, 3]
    if (!types_valid.includes(parseInt(schedule))) {
        return res.status(400).json({
            errors: [{ msg: `La jornada no es valida` }]
        })
    }

    next()
}


module.exports = {
    existGrade, scheduleValidate
}