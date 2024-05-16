import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

const coordinates_url = "http://api.openweathermap.org/geo/1.0/direct";
const weather_url = "https://api.openweathermap.org/data/3.0/onecall/overview";
const api_key = "e1604cbe8cc4c96a71db3c8929fdb567";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var data;
app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.post("/submit", async(req, res)=>{
    console.log(req.body);
    //I shld get lat and longi
    try {
    var response1 = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?appid=${api_key}&q=${req.body.city},${req.body.state},${req.body.country}`);
    
    console.log(response1.data);
    console.log(response1.data[0].lat);
    var response2 = await axios.get(`https://api.openweathermap.org/data/3.0/onecall/overview?lat=${response1.data[0].lat}&lon=${response1.data[0].lon}&appid=${api_key}`);
    console.log(response2.data);
    res.render("result.ejs", {
        city: response1.data[0].name,
        state: response1.data[0].state,
        content : response2.data.weather_overview,
    });
    } catch (error) {
        res.send("Some error");
    }
});

app.listen(PORT, (req, res)=>{
    console.log(`Server Started at Port: ${PORT}`);
});

