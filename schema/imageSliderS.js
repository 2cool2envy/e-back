var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var imageSliderSchema = new Schema({
    img: { type : Array , "default" : [] }
});

var ImageSlider = mongoose.model('ImageSlider', imageSliderSchema,'ImageSlider');

module.exports = ImageSlider;