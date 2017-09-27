var mongoose = require('mongoose');

var VenueModel = new mongoose.Schema({
    name : String,
    address : String,
    zip : Number,

    });

module.exports = mongoose.model("Venue", VenueModel);