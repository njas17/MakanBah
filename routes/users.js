var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/addToBucketList", function(req, res, next) {
    console.log(req.body.selectedRestaurant);
    let test = req.body.selectedRestaurant.name;
    console.log('-----------------------------', test);
    res.send('adding');
    // res.send('"'+test+'"');

});

module.exports = router;
