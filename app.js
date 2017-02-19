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
            res.redirect("/home/")
        }
        else {
            var movieObject = data
            var resultObject = _.pick(movieObject,  ["title", "poster", "plot", "rating"])
            res.render("moviePage", resultObject)
        }
    })
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

app.get("/home/user/:id", function(req,res) {
  var ID = req.params.id
  knex("users_movies_ratings")
  //join the users_movies_ratings table to the movies table and the users table
  //get user_name from the users table + the corresponding titles / ratings from the movies table
    .join("movies", "movies.id", "=", "users_movies_ratings.movie_id")
    .join("users", "users.id", "=", "users_movies_ratings.user_id")
    .select("*")
    .where("user_id", ID)
  //render the data into the profile template
    .then(data => {
      console.log(data)
      res.render("profile", {profile: data, user_name: data[0].user_name})
    })
    .catch(error => console.log(error))
})

app.get("/home/register", function (req, res){
  res.render("newUser")
})

// app.post("/home/user/:id", function (req, res){
// })
