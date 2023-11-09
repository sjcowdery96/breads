//basic server stuff
const express = require('express')
const breads = express.Router()
//added our bread models so we have that data to render on SHOW.
const Bread = require('../models/bread.js')


// INDEX
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            })
        })
})



// CREATE
breads.post('/', (req, res) => {
    //added check functionality for inputs
    //if no image provided, assign to undefined -- mongo will fill it in
    if (!req.body.image) {
        req.body.image = undefined
    }
    //if input is not empty, but also not a valid url, assign to undefined -- mongo will fill it in
    else if (!req.body.image.startsWith("http") || !req.body.image.startsWith("https")) {
        req.body.image = undefined
    }
    //this has to be "on" because the checkbox html element only has "on" and "off" states
    if (req.body.hasGluten === 'on') {
        //set the request body gluten boolean to true. That mf gots GLUTEN
        req.body.hasGluten = true
    } else {
        //gluten free people rejoice
        req.body.hasGluten = false
    }
    //adds the new bread to the models array using Mongoose! 
    Bread.create(req.body)
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

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
    if (req.body.hasGluten === 'on') {
        //converting our HTML button input into boolean 
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    //makes the visited index of our bread array into the new request body ie. the "updated" bread
    Bread[req.params.arrayIndex] = req.body
    //redirects to this same page -- good as a refresh
    res.redirect(`/breads/${req.params.arrayIndex}`)
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
        bread: Bread[req.params.indexArray],
        index: req.params.indexArray
    })
})



// SHOW
//for moments when we are NOT on the homepage...render SHOW
breads.get('/:id', (req, res) => {
    //uses the request params id to find the corresponding bread
    Bread.findById(req.params.id)
        //mongoose does its thing to find the bread in MongoDB
        .then(foundBread => {
            res.render('show', {
                //because of our schema, we don't need to list out each key value pair
                bread: foundBread
            })
        })
        .catch(err => {
            res.send("whoopsidaysie 404")
        })
})


//this is where we are exporting our breads array
module.exports = breads


/*


*/