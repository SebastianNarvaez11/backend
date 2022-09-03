const { Router } = require('express')
const { getStudentByGrade, getStudentByScheduleAndGrade } = require('../controllers/studentController')
const { validateToken } = require('../middlewares/validateToken')
const { existGrade, scheduleValidate } = require('../middlewares/validateMiddlewares')

const router = Router()

router.get('/grade/:id', [existGrade, validateToken,], getStudentByGrade)

router.get('/grade/schedule/:id/:schedule', [
    existGrade,
    scheduleValidate,
    validateToken],
    getStudentByScheduleAndGrade)

module.exports = router