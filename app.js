//DEPENDENCIES
var express         = require('express'),
    mongoose        = require('mongoose'),
    morgan          = require('morgan'),
    ejs             = require('ejs'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    dateFormat      = require('dateformat'),
    keys            = require('./keys.js');

//EXPRESS 
var app = express();
    app.use(express.static(`${__dirname}/public`));
    app.use('/bower_components',  express.static(`${__dirname}/bower_components`));
    app.set('view engine', 'ejs');
    app.use(morgan('dev')); 
    app.use(bodyParser.json()); 
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.text());
    app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
    app.use(methodOverride('_method'));

//DATABASE
mongoose.connect(keys.heroku);

//ROUTES
app.get('/', function(req, res){
    res.render('index');
});

var venueRoute = require('./routes/venue.js');
    app.use('/venue', venueRoute);

var queryRoute = require('./routes/query.js');
    app.use('/query', queryRoute);

//PORT
var port = (process.env.PORT || 3000);
app.listen(port, function(){
    console.log(`Server Started on ${dateFormat(new Date())}`)
});