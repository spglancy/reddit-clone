const dotenv = require('dotenv').config();
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const postController = require('./controllers/postController')
const commentController = require('./controllers/commentController')
const authController = require('./controllers/authController')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

mongoose.connect(config.mongoURL, { useNewUrlParser: true })
    .catch(err => {
        throw err
    })

app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser());
var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.nToken;
      var decodedToken = jwt.decode(token, { complete: true }) || {};
      req.user = decodedToken.payload;
      console.log("Auth success")
    }
    next();
  };
  app.use(checkAuth);
app.use('/', postController)
app.use('/', commentController)
app.use('/', authController)

app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`)
})