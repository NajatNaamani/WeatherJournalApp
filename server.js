// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser')


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8787;
const server = app.listen(port, listening());


function listening(){
    console.log(`server is running on localhost: ${port}`)};
    

   
      
// GET route
app.get('/all', getData);

function getData (request, response) {
  response.send(projectData);
};

// POST route
app.post('/add', addData);

function addData(req,res){

  newEntry = {
    temp: req.body.temp,
    content: req.body.content,
    date: req.body.date
  }

  projectData = newEntry;
  res.send(projectData);
  console.log(projectData)
}