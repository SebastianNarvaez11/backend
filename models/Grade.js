const { Schema, model } = require('mongoose')
const moment = require('moment')
const User = require("./User")


const GradeSchema = Schema({

    name: { type: String, required: [true, 'El nombre es obligatorio'], unique: [true, [' ya existe un grado con este nombre']] },
    abreviation: { type: String, required: [true, 'La abreviacion es obligatoria'], unique: [true, [' ya existe un grado con esa abreviacion']], default: ''},
    students : [{type: Schema.Types.ObjectId, ref: User}],
    is_active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })


GradeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('YYYY-MM-DDTHH:mm:ss')
        returnedObject.updated = moment(returnedObject.updated).format('YYYY-MM-DDTHH:mm:ss')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('Grade', GradeSchema)