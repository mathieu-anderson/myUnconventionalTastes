var express = require('express')
var expresshbs = require('express-handlebars')
var path = require('path')
var bodyParser = require('body-parser')
var imdb = require('imdb-api');
var _ = require('lodash');

var app = express()

var Knex = require("knex")
var knexConfig = require("./knexfile.js").development;
var knex = Knex(knexConfig)

module.exports = app;

//Handlebars engine
app.engine('handlebars', expresshbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//Body-parser makes a JSON body object out of request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", function(req, res) {
    res.redirect("/home")
})

app.get("/home", function(req, res) {
    res.render("home")
})

app.post("/home/result", function(req, res) {
    var search = req.body
    imdb.getReq(search, function(err, data) {
        if (err) {
            res.redirect("/home/error")
        }
        var movieObject = data
        var resultObject = _.pick(movieObject, ["title", "poster", "plot", "rating"])
        res.render("moviePage", resultObject)
    })
})

app.get("/home/error", function(req, res) {
    res.send("Not found :|")
})

app.post("/home/comparison", function(req, res) {
    var myRating = Number(req.body.myRating)
    var imdbRating = Number(req.body.imdbRating)

    if (myRating > imdbRating + 1) {
        res.render("greenComparisonPage", req.body)
    } else if (myRating < imdbRating - 1) {
        res.render("redComparisonPage", req.body)
    } else res.render("greyComparisonPage", req.body)
})

app.get("/home/profile", function(req, res) {
  knex("profile")
      .select("*")
      .then(dataArray => {
              var dataObject = {profile: dataArray}
              res.render("userProfile", dataObject)
      })
      .catch(error => console.log(error))
})

app.post("/home/profile", function(req, res) {
    var movieRating = req.body
    knex("profile")
        .insert(movieRating)
        .then(res.redirect("/home/profile"))
        .catch(error => console.log(error))
})
