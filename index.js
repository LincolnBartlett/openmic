//DEPENDENCIES
var express         = require('express'),
    mongoose        = require('mongoose'),
    ejs             = require('ejs'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    dateFormat      = require('dateformat');

//EXPRESS 
var app = express();
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
    
//DATABASE
mongoose.connect('mongodb://localhost/openmic');

//ROUTES
app.get('/', function(req, res){
    res.render('front');
});


var appRoute = require('./routes/app.js');

app.use('/app', appRoute);

//PORT
var port = 3000;
app.listen(port, function(){
    console.log(`Server Started on ${dateFormat(new Date())}`)
});

 
