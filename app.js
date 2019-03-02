// Require Express as a dependency
const express = require('express');
// Require bodyParser
const bodyParser = require('body-parser')
//Require cookie-parser
const cookieParser = require('cookie-parser');
// App holds a reference to Express Object
const app = express();

// Tell Express to use bodyParser. body-parser contains several parses
// the different ways the clients can send data.
// HTML usually forms normally encode the data the same way URL's do.
// So we'll use the urlencodeparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use('/static', express.static('public'));
// Using set method to set the view engine to the parameter 'pug'.
// The app.set method defines different settings in Express.
// This line tells Express which template engine to use.
app.set('view engine', 'pug');


// Import routes so it can be accessed here in app.js. No need to refer to /index.js path because index.js after ./routes because it is default path
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards')

//Use mainRoutes variable to make middleware
app.use(mainRoutes);
//add a new cards routes path
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  req.message = 'This message made it!';
  console.log(req.message)
  //const err = new Error('Oh noes!');
  // err.status = 500;
  next();
})

app.use((req, res, next) => {
  //req.message was sent via next()
  console.log(req.message);
  next();
})

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    // status isn't a special name. The name is arbitrary. The point is you can pass in a key/value through the request object.
    //Add a property of status to err object and set it to 500
    err.status = 404;
    next(err);
  })

  app.use((err, req, res, next) => {
    //loca is sent on respose object
    res.locals.error = err;
    //call the err.status property
    res.status(err.status);
    //the error object has properties that hold the data about the error so we can pass that in as the second argument to the render function
    res.render('error');
  })


app.listen(3000, () => {
  console.log('The application is running on localhost:3000!')
});
