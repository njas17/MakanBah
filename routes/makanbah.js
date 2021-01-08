// //Middleware are functions with access to the request (req) and response (res) objects
// let express = require("express");
// let router = express.Router();
// const db = require("../model/helper");
// const bodyParser = require("body-parser");
// const data = require("../data/restaurants.js");

// router.use(bodyParser.json());

// // const dataTest = require("./data/restaurants.js");



// //---------------GET restaurants list-----------------------
// router.get("/", function(req, res, next){
//     res.send(data);
//     });

// //----------POST selected restaurant to bucket list---------

// router.post("/addToBucketList", (req, res, next) => {
//     console.log(re, "I'm requesting you");
//     let newRestaurant = req.body.newRestaurant;
//         db(
//             `INSERT INTO makanbah(restaurant) VALUES (${JSON.stringify(
//             newRestaurant)};`
//         )
//             .then(results => {
//             // results.data = results.insertId;
//             // console.log(results.insertId, "is the id, also data \n", results.data)
//             res.send(results);
//             console.log("Successfuly added!");
//             })
//             .catch(err => res.status(500).send(err));
//             console.log("Not found");
// });


// //---------PUT restaurant in bucket list------------------


// //---------DELETE restaurant in bucket list---------------
// // Delete restaurant from bucket list by id









// module.exports = router;