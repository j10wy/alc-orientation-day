//Include after app-check-in.js
onlineCheckin.controller('participantSearch', function($scope, $http, $rootScope, $location, $routeParams) {

    //Get $routeParams (in this case the Constituent ID)
    $scope.$routeParams = $routeParams;

    $scope.open = function(participant) {

    	//Opens a page with the Participant's infp form the Convio Constituent Profile
        $location.path('participant/' + participant.$id); 

    }; //End open function

});
