//basic server stuff
const express = require('express')
const breads = express.Router()
//added our bread models!
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
    //now our homepage is all the breads...served fresh!
    res.send(Bread)
})
// SHOW
breads.get('/:arrayIndex', (req, res) => {
    //takes our in-browser parameter and renders the bread we asked for!
    res.send(Bread[req.params.arrayIndex])
})


module.exports = breads
