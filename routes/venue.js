var express         = require('express'),
    router          = express.Router(),
    mongoose        = require('mongoose'),
    Venue           = require('../models/venue.js'),
    NodeGeocoder    = require('node-geocoder');

//GEOCODER
var geoConf = {
    provider:'google',
    httpAhapter:'https',
    apiKey: 'AIzaSyADB4SsWvD-FPMeDp20-nDUUseoASFkwPU',
    formatter: null
};

var geocoder = NodeGeocoder(geoConf);

router.get('/', function(req, res){
    var query = Venue.find({});
        query.exec(function(err, venues){
            if(err){
                res.send(err);
            }else{
                res.json(venues);
            }
                   
        });
});

router.get('/:id', function(req, res){
        Venue.findById(req.params.id, function(err, venue){
            if (err){
                res.send(err);
            }else{
                res.render('venue/profile', {venue : venue});
            }
        });

});

router.post('/', function(req, res){
    geocoder.geocode(req.body.address, function(err,parsedAddress){
        if (err){
            res.send(err);
        }else{
            var venuejson = {
                'venuename' : req.body.venuename,
                'address' : parsedAddress,
                'location': [parseFloat(parsedAddress[0].longitude).toFixed(3),parseFloat(parsedAddress[0].latitude).toFixed(3)]
            };
            var newvenue = new Venue(venuejson);       
                newvenue.save(function(err){
                    if(err){
                        res.send(err);
                    }else{
                        res.json(venuejson);
                    }
                });
            
        }   
    });  
    
});

module.exports = router;