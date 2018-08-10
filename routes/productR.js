var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
const Product = require('../schema/productS');
const theService = require('./service');


router.post('/addP', function (req, res, next) {
    console.log("addP");

    addProduct(req.body).then((data) => {
        console.log("resolved result :", data);
        res.send(data);
    }).catch((data) => {
        res.send(data);
    });

    console.log("req.body", req.body);
});

router.get('/getP', function (req, res, next) {

    console.log("getP");
    theService.getAll('p').then(function (data) {
        console.log('In then function , data');
        res.send(data);
    }).catch();
});


let addProduct = (data) => {
    console.log("The data recieved in addProduct",data);
    return new Promise(function (resolve, reject) {
        var Pro = new Product({
            name: data.name.toLowerCase(),
            desc: data.desc,
            cat: data.cat,
            img :data.img
        });

        Pro.save(function (err, results) {
            if (err) {
                reject({ 'err': 'Some Error' });
            }
            resolve(results);
        });
    });

};

module.exports = router;