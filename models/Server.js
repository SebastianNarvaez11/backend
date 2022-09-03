const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        //iniciar coneccion con la base de datos
        this.conectarDB()

        //middlewares
        this.middlewares()

        //routes
        this.routes()
    }


    async conectarDB() {
        await dbConnection()
    }


    middlewares() {
        //cors
        this.app.use(cors())

        //Lectura y parseo de body a json
        this.app.use(express.json())
    }

    
    routes() {
        //autenticacion
        this.app.use('/api/v1/auth', require('../routes/authRoutes'))
        //usuarios
        this.app.use('/api/v1/users', require('../routes/userRoutes'))
        //estudiantes
        this.app.use('/api/v1/students', require('../routes/studentRoutes'))
        //grados
        this.app.use('/api/v1/grades', require('../routes/gradeRoutes'))
        //asistencias
        this.app.use('/api/v1/assistance', require('../routes/assistanceRoutes'))
    }


    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Backend corriendo en http://localhost:${process.env.PORT}`)
        })
    }
}

module.exports = Server