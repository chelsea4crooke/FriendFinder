var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

var PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extend: true }));

app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.text());

app.use(express.static("app/public"));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
