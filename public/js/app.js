var app = angular.module('micMap', ['queryCtrl','venueAdd', 'geolocation', 'gservice', 'ngRoute'])

    .config(function($routeProvider){

        $routeProvider.when('/find', {
            controller: 'queryCtrl',
            templateUrl: 'partials/queryForm.html',

        }).when('/addvenue', {
            controller: 'venueAdd',
            templateUrl: 'partials/venueForm.html',

        }).otherwise({redirectTo:'/find'});
    }); 