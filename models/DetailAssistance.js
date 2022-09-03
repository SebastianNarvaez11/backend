const { Schema, model } = require('mongoose')
const moment = require('moment')
const User = require('./User')


const DetailAssistanceSchema = Schema({

    student: { type: Schema.Types.ObjectId, ref: User, required: true },
    attended: { type: Boolean, default: false },
    note: { type: String, default: ''}

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })




DetailAssistanceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        returnedObject.created = moment(returnedObject.created).format('YYYY-MM-DDTHH:mm:ss')
        returnedObject.updated = moment(returnedObject.updated).format('YYYY-MM-DDTHH:mm:ss')
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model('DetailAssistance', DetailAssistanceSchema)