const { Router } = require('express')
const { check } = require('express-validator')
const { login, validateTokenGetUser } = require('../controllers/authController')
const { validateFields } = require('../middlewares/validateFields')


const router = Router()



router.post('/login', [
    check('username', 'El usuario es obligatorio').notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validateFields
], login)


router.post('/token', [
    check('token', 'No hay token para validar').notEmpty(),
    validateFields
], validateTokenGetUser)




module.exports = router