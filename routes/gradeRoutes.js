const { Router } = require('express')
const { check } = require('express-validator')
const { createGrade, getGrades } = require('../controllers/gradeController')
const { existGradeByName, existGradeByAbreviation } = require('../helpers/validators')
const { validateFields } = require('../middlewares/validateFields')
const { validateToken } = require('../middlewares/validateToken')

const router = Router()

router.get('/list', [validateToken], getGrades)

router.post('/create', [
    validateToken,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('name').custom(existGradeByName),
    check('abreviation', 'La abreviación es obligatoria').notEmpty(),
    check('abreviation').custom(existGradeByAbreviation),
    validateFields
], createGrade)

module.exports = router