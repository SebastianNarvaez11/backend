const { response } = require("express");
const Assistance = require("../models/Assistance");
const DetailAssistance = require("../models/DetailAssistance");


const createAssistance = async (req, res = response) => {

    //creamos la asistencia
    const { grade, schedule, students } = req.body
    const assistance = await new Assistance({ user_created: req.UserAuth._id, grade, schedule })
    await assistance.save()


    await Promise.all(
        students.map(async student => {
            if (student.attended === undefined) {
                student.attended = false
            }

            const detail_assistance = await new DetailAssistance({ student: student.id, attended: student.attended })
            await detail_assistance.save()

            //se añaden los detalles a la asistencia
            await Assistance.findByIdAndUpdate(assistance._id, { $push: { details: detail_assistance._id } })
        })

    ).catch(error => {
        res.status(500).json({
            errors: [{ msg: error }]
        })
    })


    const assis = await Assistance.findById(assistance._id)
        .populate('grade')


    res.json(assis)
}




const updateAssistance = async (req, res = response) => {

    const { id } = req.params
    const { user_created, grade, schedule, checked } = req.body

    const assistance = await Assistance.findByIdAndUpdate(id, { user_created, grade, schedule, checked }, { new: true })
        .populate('user_created', 'first_name last_name phone email created updated')
        .populate('grade', 'name abreviation')
        .populate({ path: 'details', select: 'student attended note', populate: { path: 'student', select: 'first_name last_name schedule phone email sex coverage is_active', sort: 'last_name' } })

    res.json(assistance)
}




const getAssistanceToday = async (req, res = response) => {

    const { schedule } = req.params

    const fecha = new Date()
    const hoy = fecha.getFullYear() + '-' + `${(fecha.getMonth() + 1)}`.padStart(2, 0) + '-' + fecha.getDate()


    const assistances = await Assistance.find({ schedule: schedule, created: { $gte: hoy } })
        .select('grade schedule checked')
        .populate('grade', 'name abreviation')
        .sort('grade')

    res.json(assistances)
}



const getAssistance = async (req, res = response) => {

    const { id } = req.params

    const assistance = await Assistance.findById(id)
        .populate('user_created', 'first_name last_name phone email created updated')
        .populate('grade', 'name abreviation')
        .populate({ path: 'details', select: 'student attended note', populate: { path: 'student', select: 'first_name last_name schedule phone email sex coverage is_active', sort: 'last_name' } })

    res.json(assistance)
}



const updateDetailAssistance = async (req, res = response) => {

    const { id } = req.params
    const { attended, note } = req.body

    const detail = await DetailAssistance.findByIdAndUpdate(id, { attended, note }, { new: true })
        .populate({ path: 'student', select: 'first_name last_name schedule phone email sex coverage is_active' })

    res.json(detail)
}

module.exports = {
    createAssistance, getAssistanceToday, getAssistance, updateDetailAssistance, updateAssistance
}