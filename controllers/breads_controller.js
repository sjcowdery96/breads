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

// CREATE
breads.post('/', (req, res) => {
    //added check functionality for inputs
    //if no image provided, give a placeholder one
    if (!req.body.image) {
        req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
    //if input is not a valid url, assign the placeholder
    if (!req.body.image.startsWith("http") || !req.body.image.startsWith("https")) {
        req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }

    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.push(req.body)
    res.redirect('/breads')
})

// NEW
breads.get('/new', (req, res) => {
    res.render('new')
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
    Bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
})


// SHOW
//for moments when we are NOT on the homepage...render SHOW
breads.get('/:arrayIndex', (req, res) => {
    if (Bread[req.params.arrayIndex]) {
        //takes our in-browser parameter and renders the bread we asked for! (remember, it indexes at 0!)
        res.render('Show', {
            //now we are actully RENDERING the array values using our "show" view
            bread: Bread[req.params.arrayIndex],
            index: req.params.arrayIndex,
        })
        //else throw a 404 error...
    } else {
        res.send('404')
    }
})



module.exports = breads


/*

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('Show', {
      bread:Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    })
  } else {
    res.render('404')
  }
})

*/