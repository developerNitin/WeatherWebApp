
var express = require("express");
var https = require("https");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));


 app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
 });

app.post("/", function(req, res) {
  var query = req.body.cityName;
  var apikey = "aa2dc135995e9722da2d1c7ae9dcff7a";
  var units = "metric";
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;

  https.get(url, function(response) {
    //console.log(res.statusCode);

    response.on("data", function(data) {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var weatherDescription = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
       var imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

      res.write( "<p>the weather is" + " currently " + weatherDescription + "</p>");
      res.write("<h1>The temp in " + query + " is " + temp + " degress Celcius</h1>");
      res.write("<img src = " + imageURL + ">");
      res.send();
    });
  });
});



app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
