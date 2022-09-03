const { response } = require("express");
const User = require("../models/User");
const Grade = require("../models/Grade");
const bcryptjs = require("bcryptjs");


const listUser = async (req, res = response) => {
    res.json('hola desde controlador')
}


const createUser = async (req, res = response) => {

    const { phone, password, type, sex } = req.body

    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    const first_name = req.body.first_name.toUpperCase()
    const last_name = req.body.last_name.toUpperCase()

    let user = await new User({ username, email, first_name, last_name, type, sex, phone, password })

    //encriptamos contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    await user.save()

    res.json({ user })
}


const createStudent = async (req, res = response) => {

    const { phone, password, type, sex, schedule, coverage, grade} = req.body

    const username = req.body.username.toLowerCase()
    const email = req.body.email.toLowerCase()
    const first_name = req.body.first_name.toUpperCase()
    const last_name = req.body.last_name.toUpperCase()

    let user = await new User({ username, email, first_name, last_name, type, schedule, coverage, sex, phone, password })

    //encriptamos contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    await user.save()

    //agregasmo el estudiante al grado
    await Grade.findByIdAndUpdate(grade, { $push: { students: user.id } })
    

    res.json({ user })
}




module.exports = {
    listUser, createUser, createStudent
}