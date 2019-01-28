const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

app.get('/',(req,res) => {
    res.render('home');
})

app.get('/post-new', (req, res) => {
    res.render('new-post')
})

app.post('/posts/new', (req, res) => {
  // add handling code
  
})

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
