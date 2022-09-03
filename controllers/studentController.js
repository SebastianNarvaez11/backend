const { response } = require("express");
const Grade = require("../models/Grade")




const getStudentByGrade = async (req, res = response) => {

    const { id } = req.params

    const grade = await Grade.findById(id)
    .populate({
        path: 'students',
        select: 'first_name last_name schedule phone email sex coverage is_active',
        options: { sort: 'last_name' }
    })

    res.json(grade.students)
}


const getStudentByScheduleAndGrade = async (req, res = response) => {

    const { id, schedule } = req.params

    const grade = await Grade.findById(id)
        .populate({
            path: 'students',
            select: 'first_name last_name schedule phone email sex coverage is_active',
            match: { schedule: schedule },
            options: { sort: 'last_name' }
        })


    res.json(grade.students)
}



module.exports = {
    getStudentByGrade, getStudentByScheduleAndGrade
}