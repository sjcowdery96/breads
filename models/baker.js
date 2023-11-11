// dependencies
const mongoose = require('mongoose')
const Bread = require('./bread')
const { Schema } = mongoose

// schema
const bakerSchema = new Schema({
    name: {
        type: String,
        required: true,
        //many names
        enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
    },
    startDate: {
        type: Date,
        required: true
    },
    bio: String
}, { toJSON: { virtuals: true } })

// At the top with your dependencies: 


// Virtuals:
//baker "parent" schema will need these virtuals
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})



// model and export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker
