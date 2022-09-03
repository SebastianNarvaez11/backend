const { Router } = require('express')
const { check } = require('express-validator')
const { listUser, createUser, createStudent} = require('../controllers/userController')
const { validateFields } = require('../middlewares/validateFields')
const { existUsername, existEmail, isValidType, isValidSchedule, existGrade, isValidSex } = require('../helpers/validators')
const { validateToken } = require('../middlewares/validateToken')

const router = Router()

router.get('/list', [validateToken], listUser)

router.post('/create', [
    validateToken,
    check('username', 'El nombre de usuario es obligatorio').notEmpty(),
    check('username').custom(existUsername),
    check('first_name', 'El nombre es obligatorio').notEmpty(),
    check('last_name', 'El apellido es obligatorio').notEmpty(),
    check('phone', 'El telefono es obligatorio').notEmpty(),
    check('password', 'la contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'el correo no es valido').isEmail(),
    check('email').custom(existEmail),
    check('type').custom(isValidType),
    check('sex').custom(isValidSex),
    validateFields
], createUser)


router.post('/students/create', [
    validateToken,
    check('username', 'El nombre de usuario es obligatorio').notEmpty(),
    check('username').custom(existUsername),
    check('first_name', 'El nombre es obligatorio').notEmpty(),
    check('last_name', 'El apellido es obligatorio').notEmpty(),
    check('phone', 'El telefono es obligatorio').notEmpty(),
    check('password', 'la contraseña debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'el correo no es valido').isEmail(),
    check('email').custom(existEmail),
    check('type').custom(isValidType),
    check('sex').custom(isValidSex),
    check('schedule').custom(isValidSchedule),
    check('schedule', 'La jornada es obligatoria').notEmpty(),
    check('grade', 'El grado seleccionado no es valido').isMongoId(),
    check('grade').custom(existGrade),
    check('grade', 'El grado es obligatorio').notEmpty(),
    validateFields
], createStudent)


module.exports = router