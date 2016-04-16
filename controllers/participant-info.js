//Include after app module and participant-search.js
onlineCheckin.controller('participantInformation', function($scope, luminateLogInteraction, $http, $rootScope, $log, $routeParams, $location, $firebaseArray, $firebaseObject) {

	   $scope.cons_id = $scope.$routeParams = $routeParams.cons_id;
       var fbConsArray = new Firebase("https://alc-oday.firebaseio.com/data/" + $scope.cons_id);
        $scope.fireBaseCons = $firebaseObject(fbConsArray);

        //Create the cons_info Object
        $scope.cons_info = {};

        //Setup $HTTP request for Constituent Information
        var luminateServlet = "CRConsAPI",
        luminateMethod = "method=getUser",
        consId = "&cons_id=",
        sso_auth_token = "&sso_auth_token=" + $rootScope.sso_auth_token;

        $http({
            method: 'POST',
            url: $rootScope.uri + luminateServlet,
            data: luminateMethod + $rootScope.postdata + consId + $scope.cons_id + sso_auth_token,
            headers: $rootScope.header
        }).then(function(responseData) {
            //Success

            //Update cons_info with the Constituent json response
            $scope.cons_info = responseData.data.getConsResponse;

            console.log("Here is the cons_info:", $scope.cons_info)

        }, function(responseData) {

            //Error
            $log.error("Could not retrieve cons_info");
            $log.error(responseData);
        });

        //Log the Check-in Interaction
        $scope.checkIn = function () {
            //luminateLogInteraction.logInteraction($scope.cons_id,"hi, its me the service");
            console.log("Is this the number?:",$scope.fireBaseCons.alcnum);
            console.log("here is what you get from $scope.fireBaseCons:", $scope.fireBaseCons);
        }
});
