const express = require('express');
const router = express.Router();

//The response object looks for the pug file because it is set in the view engine
router.get('/', (req, res) => {
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

// Create a new route with a new template
  router.get('/sandbox', (req, res) => {
    res.render('sandbox', {firstName: "Michael"})
  });

// Create a new route to a form page
  router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    // If name exists redirect to index. If not, allow 'hello' form to render
    if (name) {
      res.redirect('/');
    } else {
      res.render('hello');
    }
  });

//Create a post route to handle form submission
router.post('/hello', (req, res) => {
  //- Send a cookie. Cookie method accepts two parameters. Name of the cookie and the value.
  res.cookie('username', req.body.username);
  //- The second parameter declares the name variable so we can work with the captured response of the username input
  res.redirect('/')
});

// Create a new route called goodbye for the log out form to post to
  router.post('/goodbye', (req, res) => {
    //clear cookie then redirect to 'hello' form login page
    res.clearCookie('username', req.body.username);
    res.redirect('/hello')
  });


// export router so it can be references from index.js
module.exports = router;
