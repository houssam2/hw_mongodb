// Express
var express = require("express");
var app = express();
app.use(express.static("public"));

// Body Parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logger
var logger = require("morgan");
app.use(logger("dev"));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Mongoose
var mongoose = require("mongoose");
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise; // Leverage built in JavaScript ES6 Promises
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });// Connect to the Mongo DB

var PORT = process.env.PORT || 3000;

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

