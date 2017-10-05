var express     = require('express'),
    router      = express.Router(),
    mongoose    = require('mongoose'),
    User        = require('../models/user.js');


// GET Routes
// --------------------------------------------------------
// Retrieve records for all users in the db
router.get('/', function(req, res){
    
            // Uses Mongoose schema to run the search (empty conditions)
            var query = User.find({});
            query.exec(function(err, users){
                if(err)
                    res.send(err);
    
                // If no errors are found, it responds with a JSON of all users
                res.json(users);
            });
        });
    
// POST Routes
// --------------------------------------------------------
// Provides method for saving new users in the db
router.post('/', function(req, res){

    // Creates a new User based on the Mongoose schema and the post bo.dy
    var newuser = new User(req.body);

    // New User is saved in the db.
    newuser.save(function(err){
        if(err)
            res.send(err);

        // If no errors are found, it responds with a JSON of the new user
        res.json(req.body);
    });
});



module.exports = router;