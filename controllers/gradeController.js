const { response } = require("express");
const Grade = require('../models/Grade')

const getGrades = async (req, res = response) => {

    const grades = await Grade.find({ delete: false })
        .select('_id name abreviation is_active created')
        .sort([['created', 'ascending']])

    res.json(grades)
}


const createGrade = async (req, res = response) => {

    const name = req.body.name.toUpperCase()
    const abreviation = req.body.abreviation.toUpperCase()

    const grade = await new Grade({ name, abreviation })

    await grade.save()


    res.json({ grade })
}



module.exports = {
    createGrade, getGrades
}