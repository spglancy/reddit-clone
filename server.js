const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config')
const postController = require('./controllers/postController')
const expressValidator = require('express-validator')

mongoose.connect(config.mongoURL, { useNewUrlParser: true })
    .catch(err => {
        throw err
    })

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(methodOverride('_method'))

app.use('/', postController)

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/post-new', (req, res) => {
    res.render('new-post')
})

app.listen(config.port, () => {
    console.log(`App running on port ${config.port}`)
})