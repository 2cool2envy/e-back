var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
const Category = require('../schema/categoryS');
const Feedback = require('../schema/feedbackS');
const theService = require('./service');



router.post('/addC', function (req, res, next) {
    console.log("/addC");
    theService.checkDuplicate("Category", req.body).then((data) => {
        console.log("The data in addC from check duplicate ");
        addCategories(req.body).then((data) => {
            console.log("resolved result :", data);
          
            res.send(data);
        }).catch((data) => {
            res.send(data);
        });
    }).catch((data) => {
        console.log("Some error",data);
        res.send(data);
    });
    

});


router.get('/getC', function (req, res, next) {
    console.log(req.body);
    theService.getAll('c').then(function (data) {
        console.log('In then function , data');
        res.send(data);
    }).catch();

});



let addCategories = (data) => {
    return new Promise(function (resolve, reject) {
        var Cat = new Category({
            name: data.name.toLowerCase(),
            desc: data.desc
        });

        Cat.save(function (err, results) {
            if (err) {
                reject({ 'err': 'Some Error' });
            }
            let obj = {msg : 'Category ' + data.name + ' added', data :results}
            resolve(obj);
        });
    });

};

module.exports = router;