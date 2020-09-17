const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  //console.log(req.body.cityName);

  const query = req.body.cityName;
  const units = "imperial";
  const apiKey = "e0c47b9ecd6cbae6045c510077ddd172";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

  https.get(url, function(response){
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>Temperature in " + query + " is " + temp.toPrecision(3) + " F. </h1>");
      res.write("<p>The weather is currently " + description + ".</p>")
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  })
});

// const query = "Redondo Beach";
// const units = "imperial";
// const apiKey = "e0c47b9ecd6cbae6045c510077ddd172";
// const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

// https.get(url, function(response){
//   response.on("data", function(data) {
//     const weatherData = JSON.parse(data);
//     const temp = weatherData.main.temp;
//     const description = weatherData.weather[0].description;
//     const icon = weatherData.weather[0].icon;
//     const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
//     res.write("<h1>Temperature in " + query + " is " + temp.toPrecision(3) + " F. </h1>");
//     res.write("<p>The weather is currently " + description + ".</p>")
//     res.write("<img src=" + imgUrl + ">");
//     res.send();
//   });
// })

app.listen(3000, function() {
  console.log("Server running on port 3000");
});
