var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const bcrypt = require('bcrypt');

const utils = require('../utils');
const jwt = require('jsonwebtoken');

router.use(express.json());

//insert a user
router.post("/users", async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(7);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        let strSql = `INSERT INTO USER (bucket_list_id, firstname, lastname, email, loginpw, isAdmin) VALUES `
            + ` (0, '${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hashedPassword}', 0);`;

        db(strSql).then(results => {
            res.send(results.data);
        }).catch(err => res.status(500).send(err));
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// get user by email to check any duplicate email in the system
router.get("/users/:email", function (req, res, next) {
    db(`SELECT id, concat_ws(' ', firstname,lastname) as name, email, isAdmin, loginpw as password FROM user where email = '${req.params.email}';`)
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send(err));
});

// validate the user credentials
router.post('/signin', async function (req, res) {
    console.log("Validating user credentials...");
    const user = req.body.email;
    const pwd = req.body.password;
    const userObj = req.body.user;

    // return 400 status if username/password is not exist
    if (!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password is required."
        });
    }

    if (!userObj) return res.status(400).send('Cannot find user');     

    try{
        const comparison = await bcrypt.compare(pwd, userObj.password);

        if (comparison) {
            // user matched
            const token = utils.generateToken(userObj);
            // get basic user details
            const usr = utils.getCleanUser(userObj);
            // return the token along with user details
            return res.json({ user: usr, token });            
        } else
            res.status(401).send("Email and password does not match")
        
    } catch(error) {
        res.status(500).send(error);
    }

    console.log("user is validated with token....")
});


// post data to verify the token and return it if it's valid
router.post('/verify-token', function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token;
    var userId = req.body.user.id;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }

    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });
        console.log(user);
        // return 401 status if the userId does not match.
        if (user.id !== userId) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }
        console.log("token is validated");
        // get basic user details
        var userObj = utils.getCleanUser(req.body.user);
        return res.json({ user: userObj, token });
    });
});

module.exports = router;
