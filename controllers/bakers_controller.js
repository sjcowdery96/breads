// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')
const bakerSeedData = require('../models/baker_seed.js')

baker.get('/data/seed', (req, res) => {
    //if we visit this page, runs an insertMany command
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})

// Index: 
baker.get('/', (req, res) => {
    Baker.find()
        .populate("breads")
        //cant test this method below until we have display data for breads baked linked 
        //.populate({ path: 'breads', options: { limit: 2 } })
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

// Show: 
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})
//DELETE
baker.delete('/:id', (req, res) => {
    //uses the Mongoose native functions to find and destroy
    Baker.findByIdAndDelete(req.params.id)
        .then(deletedBaker => {
            res.status(303).redirect('/breads')
        })
})



// export
module.exports = baker                    
