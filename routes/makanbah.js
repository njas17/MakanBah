var express = require("express");
var router = express.Router();
// const bodyParser = require("body-parser");
const db = require("../model/helper");
// //const { response } = require("express");
// router.use(bodyParser.json());

//============================
// ROUTES
//============================

router.get("/", (req, res) => {
    res.send("Welcome to the API");
});

module.exports = router;