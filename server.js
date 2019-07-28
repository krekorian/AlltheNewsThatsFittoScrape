// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var axios = require("axios");
var exphbs = require('express-handlebars');
const path = require('path');
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");



var PORT = process.env.PORT || 5000;

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/AlltheNews", { useNewUrlParser: true });
// var db = require("./models");
// let db = mongoose.connection;


let db = require("./models")
// db.once('open', function () {
//     console.log("connected to mongodb")
// })

db.Article.create({
    Headline: "h1",
    Summary: "S1",
    URL: "U1"
})
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get("/articles", function (req, res) {



    // First, we grab the body of the html with axios
    axios.get("http://www.espn.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        let resData = [];
        // console.log(response.data);
        // Now, we grab every h2 within an article tag, and do the following:
        // $(".contentItem__titleWrapper").each(function (i, element) {
        //     // $("h1").each(function (i, element) {
        //     // Save an empty result object
        //     var result = {};

        //     // Add the text and href of every link, and save them as properties of the result object
        //     result.title = $(this)
        //         .children("h1")
        //         .text();
        //     result.link = $(this)
        //         .children("p")
        //         .text();
        //     // console.log(result);
        //     // Create a new Article using the `result` object built from scraping
        //     // db.Article.create(result)
        //     //     .then(function (dbArticle) {
        //     //         // View the added result in the console
        //     //         console.log(dbArticle);
        //     //     })
        //     //     .catch(function (err) {
        //     //         // If an error occurred, log it
        //     //         console.log(err);
        //     //     });
        // });

        $(".contentItem__padding").each(function (i, element) {
            // $("h1").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            let a = $(this)
                .children(".contentItem__contentWrapper")
                .children(".contentItem__titleWrapper")
                .children("h1")
                .text();
            let b = $(this)
                .children(".contentItem__contentWrapper")
                .children(".contentItem__titleWrapper")
                .children("p")
                .text();
            let c = $(this)
                .attr("href");

            if (a !== "" && b !== "") {
                result.Headline = a;
                result.Summary = b;
                result.URL = "www.espn.com" + c;
                // console.log(result);

                // db.Article.create({
                //     Headline: "h1",
                //     Summary: "S1",
                //     URL: "U1"
                // })


                // db.Article.create(result);


                resData.push(result);
                // db.Article.find({}, function (err, articles) {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         console.log(articles);
                //     }
                // })
                // db.article.insert({
                //     Headline: "a",
                //     Summary: "b",
                //     URL: "c",
                //     note: "note"
                // })


                // db.article.create(result)
                //     .then(function (dbArticle) {
                //         // View the added result in the console
                //         console.log(dbArticle);
                //     })
                //     .catch(function (err) {
                //         // If an error occurred, log it
                //         console.log(err);
                //     });
            }


            // Create a new Article using the `result` object built from scraping

        });

        // Send a message to the client
        console.log(resData)
        res.render("index", { listarticle: resData });
    });
});


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});