
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var venueSchema = new Schema({
    venuename: {type: String, required: true},
    address: {type: Array, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    mics :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mic"
        }
    ]
});


venueSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});


venueSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Venue', venueSchema);