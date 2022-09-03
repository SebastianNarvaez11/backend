const { Schema, model } = require('mongoose')
const moment = require('moment')
const User = require('./User')
const Grade = require('./Grade')
const DetailAssistance = require('./DetailAssistance')


const AssistanceSchema = Schema({

    user_created: { type: Schema.Types.ObjectId, ref: User, required: true },
    grade: { type: Schema.Types.ObjectId, ref: Grade, required: true },
    schedule: { type: Number, required: false, enum: [1, 2, 3] },
    details: [{ type: Schema.Types.ObjectId, ref: DetailAssistance }],
    checked: { type: Boolean, default: false }

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })




AssistanceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('YYYY-MM-DDTHH:mm:ss')
        returnedObject.updated = moment(returnedObject.updated).format('YYYY-MM-DDTHH:mm:ss')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('Assistance', AssistanceSchema)