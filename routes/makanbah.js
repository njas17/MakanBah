//Middleware are functions with access to the request (req) and response (res) objects
let express = require("express");
let router = express.Router();
const db = require("../model/helper");
const filePath = ".data/restaurants.js";
const bodyParser = require("body-parser");
const app = express();
const data = require("../data/restaurants.js");
// const dataTest = require("./data/restaurants.js");




//============================
// ROUTES
//============================

// GET restaurant list
router.get("/", (req, res) => {
    res.send(data);
    });



// router.get("/restaurants/:name", (req, res) => {
//     console.log("try");
//     fetch(API)
//     .then(response => {
//         console.log(response);
//         response.json()
//     })
//     .then(data => {
//         console.log(data);
//         res.send(data);
//         // this.setState({restaurants:data});
//     })
//     .catch(error => {
//         console.log("Error", error);
//     });
//     // res.send("Welcome to the API");
// });


module.exports = router;