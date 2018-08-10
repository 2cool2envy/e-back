var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
const ImageSliderS = require('../schema/imageSliderS');



router.post('/addI', function (req, res, next) {
    console.log("addI");
    console.log(req.body.img[0]);
    if (req.body === null || req.body === undefined) {
        res.send({ 'err': true, 'msg': 'err: req.body.img is not defined' });
        return false;
    }
    else {
        addImage(req.body).then((data) => {
            console.log("resolved result :", data);
            res.send(data);
        }).catch((data) => {
            res.send(data);
        });
    }

});
router.get('/getI', function (req, res, next) {

    console.log(req.body);
    theService.getAll('i').then(function (data) {
        console.log('In then function , data');
        res.send(data);
    }).catch();
});


let addImage = (data) => {
   // console.log("The data recieved in addProduct", data);
    return new Promise(function (resolve, reject) {
        var Img = new ImageSliderS({
            name: data
        });
        Img.save(function (err, results) {
            if (err) {
                reject({ 'err': err });
            }
            resolve(results);
        });
    });

};

module.exports = router;