var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var categorySchema = new Schema({
 name:String,
 desc:String,
 date:String
});

var Category = mongoose.model('categorySchema', categorySchema,'Categories');

module.exports = Category;