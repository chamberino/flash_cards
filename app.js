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
// Using set method to set the view engine to the parameter 'pug'.
// The app.set method defines different settings in Express.
// This line tells Express which template engine to use.
app.set('view engine', 'pug');

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

//The response object looks for the pug file because it is set in the view engine
app.get('/', (req, res) => {
  //- The response object's render method is used to turn templates into HTML
  //- put username in a variable
  const name = req.cookies.username;
  // If name exists, render the index template, else redirect to 'hello' form page
  if (name) {
    // Because key/value are the same, name is written once (ES6 shorthand)
    res.render('index', { name });
  } else {
    res.redirect('/hello')
  }
});

// The first parameter of the get method is the location relative to the root folder
// The get method also gets passed a request and response object
app.get('/cards', (req, res) => {
  // locals hold the variables accessible to the cards page;
  // res.locals.prompt = "Who is buried in Grant's tomb?";
  // renders the contents of card.pug
  res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whose tomb it is." })
});

// Create a new route with a new template
  app.get('/sandbox', (req, res) => {
    res.render('sandbox', {firstName: "Michael"})
  });

// Create a new route to a form page
  app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    // If name exists redirect to index. If not, allow 'hello' form to render
    if (name) {
      res.redirect('/');
    } else {
      res.render('hello');
    }
  });
//Create a post route to handle form submission
app.post('/hello', (req, res) => {
  //- Send a cookie. Cookie method accepts two parameters. Name of the cookie and the value.
  res.cookie('username', req.body.username);
  //- The second parameter declares the name variable so we can work with the captured response of the username input
  res.redirect('/')
});

// Create a new route called goodbye for the log out form to post to
  app.post('/goodbye', (req, res) => {
    //clear cookie then redirect to 'hello' form login page
    res.clearCookie('username', req.body.username);
    res.redirect('/hello')
  });

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
