const express = require('express');
//create a router instance for this router file. It will be used like the app const in the main js files which hold the express object
const router = express.Router();
const data = require('../data/flashcardData.json').data;
const cards = data.cards;

router.get('/', (req, res) => {
  const randCard = Math.floor(Math.random() * cards.length);
  res.redirect(`/cards/${randCard}`);
});

// The first parameter of the get method is the location relative to the root folder
// The get method also gets passed a request and response object
// The semicolon after the file path tells express to treat this part of the URL as a variable
router.get('/:id', (req, res) => {
  //check for the presence of a query string with the key being 'side'. Depending on if the value is question or answer will determine the side of the card.
  const { side }  = req.query;
  // the request objects parameter is stored in object as value of routed path, which is 'id'. The value is passed in by the user as the first number after the url.
  const { id } = req.params;

  if ( !side ) {
    // Return redirect to break out of program and prevent rest of code from running.
    return res.redirect(`/cards/${id}?side=question`);
  }

  // Make cookie variable accessible on this route. Must pass name into template as well.
  const name = req.cookies.username;

  // if ( !name ) {
  //   return res.redirect(`/hello`)
  // }
  // Text holds the string value of the question or answer
  const text = cards[id][side];
  // Using destructing, hint becomes a new constant and also stores the value of hint from the passed in value of cards[id]. It's the equivalent of writing hint = cards.x.hint
  const { hint } = cards[id];
  // Holds an object with two key value pairs, text and hint
  const templateData = { name, id, text, side };
    if (side ==='question') {
      templateData.hint = hint;
      templateData.sideToShow = 'answer';
      templateData.sideToShowDisplay = 'Answer';
    } else if (side ==='answer') {
      templateData.sideToShow = 'question';
      templateData.sideToShowDisplay = 'Question';
    }
  // render the contents of card.pug and make variables available
  res.render('card', templateData);
});

//export the router
module.exports = router;

  // locals hold the variables accessible to the cards page;
  // res.locals.prompt = "Who is buried in Grant's tomb?";
  // res.render('card', templateData);
    //using the id property on the params because thats what it is called in the url above. Using URL parameters is a powerful way to access different resources. We are accessing the route paramter.
     // prompt: cards[req.params.id].question,
     // hint: cards[req.params.id].hint
