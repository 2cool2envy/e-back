var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var feedbackSchema = new Schema({
  name: String,
  email : String,
  msg:String,
  date: String,
  app:String
});

var Feedback = mongoose.model('Feedback', feedbackSchema,'FeedbackShop');

module.exports = Feedback;