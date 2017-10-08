var queryCtrl = angular.module('queryCtrl', ['geolocation', 'gservice']);
queryCtrl.controller('queryCtrl', function($scope, $log, $http, $rootScope, geolocation, gservice){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.value = 75;
    $scope.formData = {};
    var queryBody = {};

    // Functions
    // ----------------------------------------------------------------------------
    geolocation.getLocation().then(function(data){
            coords = {lat:data.coords.latitude, long:data.coords.longitude};
            $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
            $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);        
            gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
        
        });

    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){
        // Run the gservice functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
        });
    });

    // Take query parameters and incorporate into a JSON queryBody
    $scope.queryUsers = function(){

        // Assemble Query Body
        queryBody = {
            longitude: parseFloat($scope.formData.longitude),
            latitude: parseFloat($scope.formData.latitude),
            distance: $scope.value
        };
        console.log(queryBody);
        // Post the queryBody to the /query POST route to retrieve the filtered results
        $http.post('/query', queryBody)
            // Store the filtered results in queryResults
            .success(function(queryResults){
                // Query Body and Result Logging
                // Pass the filtered results to the Google Map Service and refresh the map
                gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);
                // Count the number of records retrieved for the panel-footer
                $scope.queryResults = queryResults;
                $scope.queryCount = queryResults.length;
            })
            .error(function(queryResults){
                console.log('Error ' + queryResults);
            })
    };
});