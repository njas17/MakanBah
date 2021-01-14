var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bodyParser = require("body-parser");
const data = require("../data/restaurants.js");

router.use(bodyParser.json());

/* GET restaurant listing from json data*/
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    // added bodyParser then only can retrieve (data)
    res.send(data);
});

// /* GET restaurant listing from makanbahDB*/
// router.get("/restaurants", function(req, res, next) {
//     db(`SELECT * FROM restaurants;`)
//     .then(results => {
//         res.send(results.data);
//     })
//     .catch(err => res.status(500).send(err));
//     });

// transferring from json file to database
router.post("/addRestaurants", function (req, res, next) {
    //  console.log(req, "im requesting")
    let allRestaurants = req.body.allRestaurants;

    //console.log(req.body.allRestaurants);

    //three functions 
    // 1. delete data from restaurants. 
    //deleteTableData();
    
    // 2. alter to make sure auto increment happens. 
    //autoIncrementTable();

    // 3. actual inserting of data. 
    //insertRestaurantData(req.body.allRestaurants);

    for(item of allRestaurants) {
        let restaurantName = item.name;
        let restaurantAddress = item.formatted_address;
        let restaurantRating = item.rating;
        // console.log("are you adding?", item.name);
        db(`INSERT INTO restaurants (name, formatted_address, rating) VALUES (${JSON.stringify(restaurantName)}, ${JSON.stringify(restaurantAddress)}, ${restaurantRating});`
        )
        .then(results => {
            // res.send(results);
            console.log("Successfully updated");
        })
        .catch(err => {
            console.log("ERRROOORRRR", err);
            res.status(500).send(err)
        });
    }

});


/* DELETE restaurant from database when refreshed so there's no repetition */
// Then alter table to make sure id auto increment starts back at 1
router.delete("/clearRestaurants", function(req, res, next) {
    // console.log(req.params.id);
    db(`DELETE FROM restaurants; ALTER TABLE restaurants AUTO_INCREMENT = 1;`)
        .then(results => {
            res.send(results.data);
            console.log("Record has been deleted");
        })
        .catch(err => {
            res.status(500).send(err)
            console.log('DELETE ISSUES');
        });
});

// /* POST restaurant to bucketlist. */
// router.post("/addToBucketList", function(req, res, next) {
//     console.log(req.body.postRestaurant);
//     let test = req.body.postRestaurant.name;
//     console.log('-----------------------------', test);
//     res.send('adding');
//     // res.send('n"'+test+'"');

// });

// router.post('/addToBucketList', function (req, res) {
//     let addedRestaurant = req.body.postRestaurant.name;
//     db(`INSERT INTO bucket_list(), VALUES (${JSON.stringify(addedRestaurant)});`
//     )
//     .then(results => {
//         res.send(results);
//         console.log("Successfully added!");
//     })
//     .catch(err => res.status(500).send(err));
//     console.log("Please try again");
// });

router.post("/addToBucketList", function(req, res, next) {
    console.log("got here");
    let existingRestaurant = req.body.restaurant_id;
    let newComplete = req.body.complete;
    console.log("+++++++++++++++++++++++++++++++", existingRestaurant, newComplete);
    db(`INSERT INTO bucket_list (restaurant_id, complete) VALUES (${existingRestaurant}, ${newComplete});`)
    .then(results => {
        res.send(results);
        console.log("Successfully added");
    })
    .catch(err => res.status(500).send(err));
});

router.get("/getRestaurantID", function(req, res, next) {
    let getRestaurantName = req.query.restaurantName
    db(`SELECT id FROM Restaurants WHERE name= (${JSON.stringify(getRestaurantName)});`)
    .then(results => {
        let resultArray = Object.values(JSON.parse(JSON.stringify(results)));
        let resultId = null;
        // console.log("++++++++++++++++++++++++++++++");
        resultArray.forEach((item) => {  
            resultId = item[0].id; 
            // console.log(resultId, "*******************************", item[0].id);
            res.send(JSON.stringify(resultId));
            return;
        });
    })
    .catch(err => res.status(500).send(err));
})

/* DELETE restaurant from bucketlist. */
router.delete("/addToBucketList/:id", function(req, res, next) {
    console.log(req.params.id);
    db(`DELETE FROM bucket_list WHERE id= ${req.params.id}`)
        .then(results => {
            res.send(results.data);
            console.log("Record has been deleted");
        })
        .catch(err => res.status(500).send(err));
        console.log("ID not found");
});

router.get("/users/:id", function(req, res, next) {
    console.log(req.params.id);
    db(`DELETE FROM bucket_list WHERE id= ${req.params.id}`)
        .then(results => {
            res.send(results.data);
            console.log("Record has been deleted");
        })
        .catch(err => res.status(500).send(err));
        console.log("ID not found");
});







module.exports = router;
