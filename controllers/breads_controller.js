//basic server stuff
const express = require('express')
const breads = express.Router()
//added our bread models so we have that data to render on SHOW.
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
    res.render('index',
        //time to lay into those key value and pass them in bb..
        {
            breads: Bread, //sends the ENTIRE collection of models
            title: 'Home Page'
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
    //this has to be "on" because the checkbox html element only has "on" and "off" states
    if (req.body.hasGluten === 'on') {
        //set the request body gluten boolean to true. That mf gots GLUTEN
        req.body.hasGluten = true
    } else {
        //gluten free people rejoice
        req.body.hasGluten = false
    }
    //adds the new bread to the models array
    Bread.push(req.body)
    //redirects us to breads page
    res.redirect('/breads')
})

// NEW
breads.get('/new', (req, res) => {
    //renders the jsx file for new
    res.render('new')
})

// DELETE
breads.delete('/:indexArray', (req, res) => {
    //grabs the value of the array corresponding to our bread page and removes it
    Bread.splice(req.params.indexArray, 1)
    //sends a successful status code then redirects to home page
    res.status(303).redirect('/breads')
})


// SHOW
//for moments when we are NOT on the homepage...render SHOW
breads.get('/:arrayIndex', (req, res) => {
    //if the arrayIndex we requested exists...render it
    if (Bread[req.params.arrayIndex]) {
        //takes our in-browser parameter and renders the bread we asked for! (remember, it indexes at 0!)
        res.render('Show', {
            //now we are actully RENDERING with the key values from our models using our "show" view
            bread: Bread[req.params.arrayIndex],
            index: req.params.arrayIndex,
        })
        //else throw a 404 error...
    } else {
        res.send('404')
    }
})


//this is where we are exporting our breads array
module.exports = breads


/*


*/