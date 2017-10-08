var express     = require('express'),
router          = express.Router(),
mongoose        = require('mongoose'),
Venue           = require('../models/venue.js');


router.post('/', function(req, res){
    
    var lat             = req.body.latitude;
    var long            = req.body.longitude;
    var distance        = req.body.distance;

    var query = Venue.find({});

    if(distance){
        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},
            maxDistance: distance * 1609.34, spherical: true});
    }

    /*
    if(male || female || other){
        query.or([{ 'gender': male }, { 'gender': female }, {'gender': other}]);
    }

    // ...include filter by Min Age
    if(minAge){
        query = query.where('age').gte(minAge);
    }

    // ...include filter by Max Age
    if(maxAge){
        query = query.where('age').lte(maxAge);
    }

    // ...include filter by Favorite Language
    if(favLang){
        query = query.where('favlang').equals(favLang);
    }

    // ...include filter for HTML5 Verified Locations
    if(reqVerified){
        query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
    }
 */

    query.exec(function(err, venues){
        if(err)
            res.send(err);
        res.json(venues);
    });
});



module.exports = router;