var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
const CategoryD = require('../schema/categoryS');
const ProductD = require('../schema/productS');
const ImageSliderD = require('../schema/imageSliderS');
const FeedbackD = require('../schema/feedbackS');

let checkDuplicate = (document, parameter) => {
    console.log("Check duplicate");
    return new Promise(function (resolve, reject) {

        console.log("document", document);
        console.log("parameter.name", parameter.name);

        CategoryD.findOne({ name: parameter.name.toLowerCase() }, function (err, users) {
            if (err) {
                console.log("err",err);
               // reject({ 'msg': 'Some error !', 'error': true });
               reject(err);
            }
            else if (users !== null) {
                console.log("err + null",err);
                reject({ 'msg': 'Category with same name alraeady exists', 'error': true });
                //reject(err);
            }
            console.log("dup : ", users);
            resolve(users);
        });
    });
};

let getAll = (document) => {
    console.log("Inside the getAll");
    return new Promise(function (resolve, reject) {
        var theDocument;
        console.log("document", document);
        if (document === 'p') {
            theDocument = ProductD;
        }
        else if (document === 'c') {
            theDocument = CategoryD;
        }
        else if (document === 'i') {
            theDocument = ImageSliderD;
        }
        else if (document === 'f') {
            theDocument = FeedbackD;
        }
        
        console.log("Before finding getAll:", theDocument);
        theDocument.find({}, function (err, users) {
            if (err) {
                reject({ 'msg': 'Some error while fetching categories !', 'error': true });
            }
            console.log("getAll : ", users);
            resolve(users);
        });
    });
}



module.exports = {
    checkDuplicate,
    getAll

}
// exports.checkDuplicate = checkDuplicate;