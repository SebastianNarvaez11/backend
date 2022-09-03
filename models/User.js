const { Schema, model } = require('mongoose')
const moment = require('moment')

// (1, 'Administrador'),
// (2, 'Docente'),
// (3, 'Padre'))

// (1, 'Hombre')
// (2 , 'Mujer')

const UserSchema = Schema({
    username: { type: String, required: [true, 'El nombre de usuario es obligatorio'], unique: [true, [' ya existe un usuario con este nombre de usuario']] },
    first_name: { type: String, required: [true, 'El nombre es obligatorio'] },
    last_name: { type: String, required: [true, 'El apellido es obligatorio'] },
    phone: { type: String, required: [true, 'El telefono es obligatorio'] },
    email: { type: String, required: [true, 'el correo es obligatorio'], unique: [true, 'ya existe un usuario con este correo'] },
    password: { type: String, required: [true, 'la contraseña es obligatoria'], },
    type: { type: Number, required: true, enum: [1, 2, 3] },
    sex: { type: Number, required: true, enum: [1, 2] },
    schedule: { type: Number, required: false, enum: [1, 2, 3] },
    coverage: { type: Boolean, default: false},
    is_active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })


UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('YYYY-MM-DDTHH:mm:ss')
        returnedObject.updated = moment(returnedObject.updated).format('YYYY-MM-DDTHH:mm:ss')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('User', UserSchema)