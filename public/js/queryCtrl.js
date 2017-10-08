var queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);

queryCtrl.controller('queryCtrl', function($scope, $log, $http, $rootScope, geolocation, gservice){

    $scope.value = 75;
    $scope.formData = {};
    var queryBody = {};

    geolocation.getLocation().then(function(data){
            coords = {lat:data.coords.latitude, long:data.coords.longitude};
            $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
            $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);        
            gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
        
        });

    $rootScope.$on("clicked", function(){
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
        });
    });

    $scope.queryUsers = function(){
        queryBody = {
            longitude: parseFloat($scope.formData.longitude),
            latitude: parseFloat($scope.formData.latitude),
            distance: $scope.value
        };

    $http.post('/query', queryBody)
        .success(function(queryResults){
            gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);
            $scope.queryResults = queryResults;
            $scope.queryCount = queryResults.length;
        })
        .error(function(queryResults){
            console.log('Error ' + queryResults);
        })
    };
});