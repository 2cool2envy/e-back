var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
  name: String,
  desc : String,
  cat:String,
  img: { type : Array , "default" : [] }
});

var Product = mongoose.model('Product', productSchema,'Product');

module.exports = Product;