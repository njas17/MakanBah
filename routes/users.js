var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bodyParser = require("body-parser");
const data = require("../data/restaurants.js");
const cors = require('cors');

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


const utils = require('../utils');
const jwt = require('jsonwebtoken');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

let userData = {
        userId: 1,
        email: "meow@some.com",
        name: "LittleMeow",
        isAdmin: 0
};

// validate the user credentials
router.post('/signin', function (req, res) {
    const user = req.body.email;
    const pwd = req.body.password;
    
    // return 400 status if username/password is not exist
    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password is required."
      });
    }
    
    // validate the user credentials - checking from the database
    let sqlStr = "SELECT id as userId, concat(firstname, lastname) as name, email, isAdmin "
    + "FROM USER WHERE email='" + user + "' and loginpw='" + pwd + "';";
    //console.log(sqlStr);
    db(sqlStr)
        .then(results => results.data[0])
        .then(data =>{
            //use dummy data userData first
            const token = utils.generateToken(data);
            // get basic user details
            const userObj = utils.getCleanUser(data);
            // return the token along with user details


            console.log(token);
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            console.log("the user id --------", decoded.userId); // bar

            return res.json({ user: userObj, token });
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                error: true,
                message: "Wrong email or password." 
            })
        });

        console.log("user is validated with token....")
  });
  

// verify the token and return it if it's valid
router.get('/verifyToken', function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.query.token;
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }

    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {    
      console.log("testing");
      
      if (err) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });

      // return 401 status if the userId does not match.
      if (user.userId !== userData.userId) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      }
      // get basic user details
      var userObj = utils.getCleanUser(userData);
      return res.json({ user: userObj, token });
    });
  });
  



module.exports = router;
