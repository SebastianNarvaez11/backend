const User = require("../models/User")
const Grade = require("../models/Grade")


const existUsername = async (e) => {

    const username = e.toLowerCase()
    const user = await User.findOne({ username })
    if (user) {
        throw new Error(`Ya existe un usuario con el nombre de usuario: ${username}`)
    }

    return true
}


const existEmail = async (e) => {

    const email = e.toLowerCase()
    const user = await User.findOne({ email })
    if (user) {
        throw new Error('Ya existe un usuario con ese correo')
    }

    return true
}


const isValidType = async (type) => {

    const types_valid = [1, 2, 3]
    if (!types_valid.includes(type)) {
        throw new Error('El tipo de usuario no es valido')
    }

    return true
}


const isValidSex = async (type) => {

    const types_valid = [1, 2]
    if (!types_valid.includes(type)) {
        throw new Error('El genero no es valido')
    }

    return true
}


//validamos la jornada: si viene en el body, validamos que sea una jornada valida
const isValidSchedule = async (e) => {

    if (e) {
        const types_valid = [1, 2, 3]
        if (!types_valid.includes(e)) {
            throw new Error('La jornada no es valida')
        }
    }

    return true
}


const existGrade = async (e) => {

    if (e) {
        const grade = await Grade.findById(e)
        if (!grade) {
            throw new Error(`El grado seleccionado no existe`)
        }

    }

    return true
}


const existGradeByName = async (e) => {

    const name = e.toUpperCase()
    const grade = await Grade.findOne({ name })
    if (grade) {
        throw new Error(`Ya existe un grado con el nombre: ${name}`)
    }

    return true
}


const existGradeByAbreviation = async (e) => {

    const abreviation = e.toUpperCase()
    const grade = await Grade.findOne({ abreviation })
    if (grade) {
        throw new Error(`Ya existe un grado con la abreviación: ${abreviation}`)
    }

    return true
}



module.exports = {
    existUsername, existEmail, isValidType, isValidSchedule, existGrade, existGradeByName, existGradeByAbreviation, isValidSex
}