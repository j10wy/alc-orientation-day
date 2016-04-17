// Include after app module and participant-search.js
onlineCheckin.controller('participantInformation', function($scope, $timeout, LogInteraction, $http, $rootScope, $log, $routeParams, $location, $firebaseArray, $firebaseObject) {

	// Get the participant's Consituent ID from the URL
    $scope.cons_id = $scope.$routeParams = $routeParams.cons_id;

    // GET Participant's info from Firebase data
    var fbCons = new Firebase("https://alc-oday.firebaseio.com/data/" + $scope.cons_id);
    $scope.fireBaseCons = $firebaseObject(fbCons);

    // Initialize the DOTR Number field and set Coney Success image to false
    $scope.dotr_number = "";
    $scope.notes = ""
    $scope.coney = false;

        // Create the cons_info Object
        $scope.cons_info = {};

        // Setup $HTTP request for Constituent Information
        var luminateServlet = "CRConsAPI",
        luminateMethod = "method=getUser",
        consId = "&cons_id=",
        sso_auth_token = "&sso_auth_token=" + $rootScope.sso_auth_token;

        // HTTP Request for Participant's Constituent profile information
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


        $scope.checkIn = function () {

            //Set date string
            var date = new Date().toString();

            //Log a check-in interaction in Luminate
            LogInteraction.log($scope.cons_id,$scope.notes);

            //Pass check-in time to Firebase
            fbCons.update({
                checkedin:date,
                dotr_number:$scope.dotr_number
            });

            console.log("Parent path:",fbCons.parent().parent().toString());

            //Display Coney
            $scope.coney = true;

            //Return to Search
            $timeout(function(){
                $location.path('/search'); 
            }, 2000);

        }
});
