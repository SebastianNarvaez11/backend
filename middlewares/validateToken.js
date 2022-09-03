const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/User");





const validateToken = async (req = request, res = response, next) => {

    const token = req.header('Authorization')

    //validamos si viene el token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token de acceso en la petición' })
    }

    //validamos si el token es valido
    try {

        //sacamos el id envuelto en el token
        const { id } = jwt.verify(token, process.env.SECRET_PRIVATE_TOKEN_KEY)

        //buscamos un usuario con ese id
        const user = await User.findById(id)

        //validamos si el usuario existe
        if (!user) {
            return res.status(401).json({ msg: 'Token Invalido - El usuario no existe' })
        }

        //validamos que tenga estado true o delete en false
        if (!user.is_active || user.deleted) {
            return res.status(401).json({
                msg: 'Token Invalido - El usuario esta inhabilitado'
            })
        }

        //colocamos el User autenticado en la request, para que los otros middlewares que siguen tengan acceso a el
        req.UserAuth = user

        next()


    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'token no valido' })
    }
}

module.exports = { validateToken }