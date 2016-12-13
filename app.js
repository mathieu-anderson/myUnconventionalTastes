// var Knex = require("knex")
// var knexConfig = require("./knexfile.js").development;
// var knex = Knex(knexConfig)

var express = require('express')
var expresshbs = require('express-handlebars')
var path = require('path')
var bodyParser = require('body-parser')

var app = express()

module.exports = app;


//Handlebars engine
app.engine('handlebars', expresshbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body-parser makes a JSON body object out of request
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')))


app.get("/", function(req, res){
  res.send("hello")
})
