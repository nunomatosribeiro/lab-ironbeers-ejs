const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { data: beersFromApi });
      console.log('Beers from the database: ', beersFromApi);
    })
    .catch(error => console.log(error));
});

app.get('/random_beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      res.render('random_beer', { beer: beersFromApi[0] });
      console.log('Random beer from the database:', beersFromApi[0]);
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  const beerId = req.params.id;

  punkAPI
    .getBeer(beerId)
    .then(beerArray => {
      res.render('partials/beer', { beer: beerArray[0] });
      console.log('Beer details:', beerArray[0]);
    })
    .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
