//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


 app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
 });

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apikey = "aa2dc135995e9722da2d1c7ae9dcff7a";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units;

  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

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
