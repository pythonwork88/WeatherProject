const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html")

});

app.post('/', function(req, res){
  console.log(req.body.cityName)
  const query = req.body.cityName
  const apykey = "ac372ce0025990acb785274b9fb7bf07"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apykey + "&units=" + unit
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
     const weatherData = JSON.parse(data)
     const temp = weatherData.main.temp
     const weatherDescription = weatherData.weather[0].description
     const icon = weatherData.weather[0].icon
     const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
     res.write("<p>The weather is currently " + weatherDescription + "</p>")
     res.write("<h1>The temperature in oslo is " + temp + "degrees Celcius.</h1>");
     res.write("<img src=" + imageURL + ">")
     res.send()
    })
  })
})






app.listen(3000, function(){
  console.log("start 3000 port");
});
