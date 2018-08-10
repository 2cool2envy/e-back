var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
const Feedback = require('../schema/feedbackS');
const theService = require('./service');





router.post('/addF', function (req, res, next) {
    console.log("addF");
    console.log(req.body);
   
    addFeedback(req.body).then((data) => {
        console.log("resolved result :", data);
        res.send({data: data,error:false});
    }).catch((data) => {
        res.send({data: 'Not Resolve',error:true});
    });
});
router.get('/getF', function (req, res, next) {
    console.log("/getF");
    console.log(req.body);
    theService.getAll('f').then(function (data) {
        console.log('In then function , data');
        res.send(data);
    }).catch();

});


let addFeedback = (data) => {
    console.log("The data recieved in addFeedback", data);
    return new Promise(function (resolve, reject) {
        var FEED = new Feedback({
            email: data.email.toLowerCase(),
            msg: data.msg,
            date: data.date,
            app: data.app
        });

        FEED.save(function (err, results) {
            if (err) {
                console.log("rejected");
                reject({ 'err': 'Some Error','msg':err });
            }
            console.log("resolved");
            resolve(results);
        });
    });

};

module.exports = router;