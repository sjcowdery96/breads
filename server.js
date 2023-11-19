// DEPENDENCIES
const express = require('express')

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()

// DEPENDENCIES
const methodOverride = require('method-override')

// MIDDLEWARE
//must be added above //ROUTES
app.use(express.static('public'))
//tells the app where are keeping our "views"
app.set('views', __dirname + '/views')
//tells the app our views engine is react, ergo jsx files
app.set('view engine', 'jsx')
//and of course, here is the engine of the app, firing up react 
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({ extended: true }))
//this lets us get funky with using POST to delete things...weird
app.use(methodOverride('_method'))
// require mongoose 
const mongoose = require('mongoose')
// creating shorthand for the Schema constructor 
const { Schema } = mongoose
//Connect Mongoose 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })


// ROUTES
//our homepage is defined here with the home page jsx file
app.get('/', (req, res) => {
    res.render('home')
})

// Breads
//instantiates the controller for the app from our local filepath
const breadsController = require('./controllers/breads_controller.js')
//uses the controller on the /breads path
app.use('/breads', breadsController)

// Bakers
//instantiates the controller for the app from our local filepath
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
    res.send('404')
})

// 404 Page
//if any other file path happens...throw a 404 error and insult the user
app.get('*', (req, res) => {
    res.send('Ya dum fak...404')
})

// LISTEN

//now we actually send it to the port and listen for user input!
app.listen(PORT, () => {
    console.log('listening on port ', PORT);
})
