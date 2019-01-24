const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

app.get('/',(req,res) => {
    res.render('home');
})

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
