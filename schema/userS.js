var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var usersSchema = new Schema({
  email: String,
  password: String
});

var User = mongoose.model('User', usersSchema,'UserShop');

module.exports = User;