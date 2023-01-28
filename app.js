const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
// const { dirname } = require("path");

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res)
{

    res.sendFile(__dirname+"/index.html");

 
   
})

app.post("/", function(req,res)
{
    console.log("Response received");
    const query=req.body.city;
    const apikey="42e4d899f1703b14f8a75be2ed1b1463";

   const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=42e4d899f1703b14f8a75be2ed1b1463&units=metric";


    https.get(url, function(api_res)
    {
        console.log(api_res.statusCode);

        api_res.on("data", function(data)
        {
            const weatherdata=JSON.parse(data);
            console.log(weatherdata);
            var temp = weatherdata.main.temp;
            var wdesc = weatherdata.weather[0].description; //weather is actually an array of 1 item so '[0]' used.
            console.log(temp);
            console.log(wdesc); 
            //res.send(); can be used only once, however res.write() can be used multiple times and finally res.send() can be used once to send all res.write() commands.
            res.write("<h1>The weather in "+query+" is "+temp+" degrees celsius");
            res.write("<p>Weather is currently "+wdesc+"</p>");
            res.send();
        })
    })

})


app.listen(3000, function()
{
    console.log("Server started at 3000");
})