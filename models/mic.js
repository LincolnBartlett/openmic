var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;


var micSchema = new Schema({
    micname : String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}

});


micSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});


module.exports = mongoose.model('Mic', micSchema);