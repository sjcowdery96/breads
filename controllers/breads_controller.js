//basic server stuff
const express = require('express')
const breads = express.Router()
//added our bread models so we have that data to render on SHOW.
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')


// INDEX
//cleaner await code 
breads.get('/', async (req, res) => {
    //make it...LEEEEEEEEEEAAAAAAAANN
    const foundBakers = await Baker.find()
    const foundBreads = await Bread.find()
    res.render('index', {
        breads: foundBreads,
        bakers: foundBakers,
        title: 'Index Page'
    })
})


/*
    Baker.find()
        .then(foundBakers => {
            Bread.find()
                .then(foundBreads => {
                    res.render('index', {
                        breads: foundBreads,
                        bakers: foundBakers,
                        title: 'Index Page'
                    })
                })
        })
*/



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


//NEW
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
        })
})


// DELETE
breads.delete('/:id', (req, res) => {
    //since we have the ID in the request parameters, use that within Mongo to find and delete
    Bread.findByIdAndDelete(req.params.id)
        .then(deletedBread => {
            //sends a successful status code then redirects to home page
            res.status(303).redirect('/breads')
        })
})

// UPDATE
breads.put('/:id', (req, res) => {
    if (req.body.hasGluten === 'on') {
        //converting our HTML button input into boolean 
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    //makes the visited index of our bread array into the new request body ie. the "updated" bread
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedBread => {
            console.log(updatedBread)
            //redirects to this same page -- good as a refresh
            res.redirect(`/breads/${req.params.id}`)
        })


})

// EDIT
breads.get('/:id/edit', (req, res) => {
    //now finds the baker first, then finds the bread from that baker
    Baker.find()
        .then(foundBakers => {
            Bread.findById(req.params.id)
                .then(foundBread => {
                    res.render('edit', {
                        bread: foundBread,
                        bakers: foundBakers
                    })
                })
        })
})




// SHOW
//for moments when we are NOT on the homepage...render SHOW
breads.get('/:id', (req, res) => {
    //uses the request params id to find the corresponding bread
    Bread.findById(req.params.id)
        //referencees the parent Schema
        .populate({ path: 'baker', options: { limit: 2 } })
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

//SEED DATA
breads.get('/data/seed', (req, res) => {
    Bread.insertMany([
        {
            name: 'Rye',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
        {
            name: 'French',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        },
        {
            name: 'Gluten Free',
            hasGluten: false,
            image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        },
        {
            name: 'Pumpernickel',
            hasGluten: true,
            image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        }
    ])
        .then(createdBreads => {
            res.redirect('/breads')
        })
})



//this is where we are exporting our breads array
module.exports = breads


/*
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})


*/