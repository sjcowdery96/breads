//basic server stuff
const express = require('express')
const breads = express.Router()
//added our bread models!
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
    res.render('index',
        //time to lay into those key value pairs bb..
        {
            breads: Bread,
            title: 'Index Page'
        }
    )
    // res.send(Bread)
})


// SHOW
breads.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
        //takes our in-browser parameter and renders the bread we asked for! (remember, it indexes at 0!)
        res.render('Show', {
            //now we are actully RENDERING the array values
            bread: Bread[req.params.arrayIndex]
        })
        //else throw a 404 error
    } else {
        res.send('404')
    }
})



module.exports = breads
