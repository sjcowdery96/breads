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


// ROUTES
app.get('/', (req, res) => {
    //this is the text you will see on our base root page "/"
    res.send('Welcome to an Awesome App about Breads!')
})

// Breads
//instantiates the controller for the app from our local filepath
const breadsController = require('./controllers/breads_controller.js')
//uses the controller on the /breads path
app.use('/breads', breadsController)

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
