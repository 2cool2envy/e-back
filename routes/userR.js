var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
const User = require('../schema/userS');
const bcrypt = require('bcrypt');





router.post('/addU', function (req, res) {
    console.log("addU");
    let user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save(function (err, data) {
        if (err) {
            return res.json({ error: true });
        }
        res.json({ error: false });
    })
});
router.post('/checkU', function (req, res, next) {
    console.log("checkU");
    console.log(global.config.theKey);
    console.log("req.body", req.body);
    User.findOne({}, function (err, user){
        if(err)
        {
            return res.json({ error: true });
        }
        if(user) {
            const JWTToken = jwt.sign({
               email: user.email
            },
            global.config.theKey,
               {
                  expiresIn: '2h'
               });
            return res.status(200).json({
               success: 'Welcome to the JWT Auth',
               token: JWTToken
            });
         }
        console.log(user);
       // res.send(user);
      })

    });


let getCategories = () => {
    return new Promise(function (resolve, reject) {
        var query = Category.find({});
        query.exec(function (err, users) {
            if (err) {
                throw err;
                reject();
            }
            console.log('Data from promise after limitation : ', users);
            resolve(users);
        });

    });
}

module.exports = router;