var mongoose = require('mongoose');

var UserModel = new mongoose.Schema({
    name: String,
    zip : Number,
    host : Boolean
    });

module.exports = mongoose.model("User", UserModel);