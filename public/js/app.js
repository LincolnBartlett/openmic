// app.js

// Declares the initial angular module "meanMapApp". Module grabs other controllers and services. Note the use of ngRoute.
var app = angular.module('micMap', ['addCtrl', 'queryCtrl','venueAdd', 'geolocation', 'gservice', 'ngRoute'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        // Join Team Control Panel
        $routeProvider.when('/find', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html',

            // All else forward to the Join Team Control Panel
        }).when('/addvenue', {
            controller: 'venueAdd',
            templateUrl: 'partials/venueForm.html',

            // All else forward to the Join Team Control Panel
        }).otherwise({redirectTo:'/find'});
    });