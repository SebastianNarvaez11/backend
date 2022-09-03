const { response } = require("express");
const bcryptjs = require('bcryptjs')
const User = require("../models/User");
const { generateJWT } = require("../helpers/generateToken");
const jwt = require('jsonwebtoken')


const login = async (req, res = response) => {

    const { username, password } = req.body

    try {

        const user = await User.findOne({ username })

        //validamos si el usuario existe
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: 'Usuario / Contraseña incorrectos' }]
            })
        }


        //validamos si el usuario esta activo o eliminado
        if (!user.is_active || user.deleted) {
            return res.status(400).json({
                errors: [{ msg: 'Usuario inactivo, hable con el administrador' }]
            })
        }


        //validamos la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                errors: [{ msg: 'Usuario / Contraseña incorrectos' }]
            })
        }


        //generamos el token 
        const token = await generateJWT(user.id)


        res.json({ user, token })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'hable con el administrador - error 500'
        })
    }
}






const validateTokenGetUser = async (req, res = response) => {

    const { token } = req.body

    try {
        //sacamos el id envuelto en el token
        const { id } = jwt.verify(token, process.env.SECRET_PRIVATE_TOKEN_KEY)

        //buscamos un usuario con ese id
        const user = await User.findById(id)
            .select('-password')

        //validamos si el usuario existe
        if (!user) {
            return res.status(401).json({ msg: 'Token Invalido - El usuario no existe' })
        }

        //validamos que el usuario tenga estado true o delete en false
        if (!user.is_active || user.deleted) {
            return res.status(401).json({
                msg: 'Token Invalido - El usuario esta inhabilitado'
            })
        }


        res.json({ user })

    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'Token no valido' })
    }
}




module.exports = { login, validateTokenGetUser }