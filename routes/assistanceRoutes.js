const { Router } = require('express')
const { check } = require('express-validator')
const { createAssistance, getAssistanceToday, getAssistance, updateDetailAssistance, updateAssistance } = require('../controllers/assistanceController')
const { existGrade } = require('../helpers/validators')
const { validateFields } = require('../middlewares/validateFields')
const { validateToken } = require('../middlewares/validateToken')

const router = Router()

router.post('/create', [
    validateToken,
    check('grade', 'el grado seleccionado no es valido').isMongoId(),
    check('grade').custom(existGrade),
    validateFields
], createAssistance)

router.put('/update/:id', [validateToken], updateAssistance)

router.get('/list/:schedule', [validateToken], getAssistanceToday)

router.get('/get/:id', [validateToken], getAssistance)




router.put('/detail/:id', [validateToken], updateDetailAssistance)




module.exports = router