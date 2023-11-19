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
    //below ensures all the virtuals are JSON
}, { toJSON: { virtuals: true } })

// At the top with your dependencies: 


// Virtuals:
//baker schema can now use "breads" to call Breads.baker
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})


//Hooks...
bakerSchema.post('findOneAndDelete', function () {
    //litstening for the findOneAndDelete method
    //deletes ALL breads matching this baker ID
    Bread.deleteMany({ baker: this._conditions._id })
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
})



// model and export
const Baker = mongoose.model('Baker', bakerSchema)
module.exports = Baker
