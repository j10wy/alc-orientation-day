// Include after app module and participant-search.js
onlineCheckin.controller('incentivesCtrl', function($scope, $timeout, LogInteraction, constituentService, participantProgress, $http, $rootScope, $log, $routeParams, $location, $firebaseArray, $firebaseObject) {

	// Get the participant's Consituent ID from the URL
    $scope.cons_id = $scope.$routeParams = $routeParams.cons_id;
    $scope.incentives = {};

    // GET Participant's info from Firebase data
    var fbIncentive = new Firebase("https://alc-oday.firebaseio.com/incentives/" + $scope.cons_id);
    var incentives = $firebaseObject(fbIncentive);

    fbIncentive.on("value", function(snapshot) {
        console.log("***** FBIncentive:", snapshot.val());
    });

       incentives.$loaded()
        .then(function(data) {
            console.log("Incentives loaded:",data === incentives); // true
            $scope.roadieBeanie = incentives["Roadie Beanie"];
            $scope.roadieHoodie= incentives["Roadie Hoodie"];
            $scope.roadieVest= incentives["Roadie Fleece"];
            $scope.fiveKJersey= incentives["5K Jersey"];
            $scope.tenKJersey= incentives["10K Jersey"];
            $scope.tenKShorts= incentives["10K Shorts"];
            $scope.fifteenKJacket= incentives["15K Jacket"];
            $scope.top50= incentives["Top 50"];
            $scope.top545= incentives["Top 545"];
        })
        .catch(function(error) {
            console.error("Incentives error:", error);
        });

    incentives.$bindTo($scope, "incentives").then(function() {
        console.log("Incentives List:",$scope.incentives);

        angular.forEach(incentives, function(value, key) {
            console.log(key, value);
        });

        console.log($scope)

    });

    // Initialize the DOTR Number field and set Coney Success image to false
    $scope.notes = "";
    $scope.coney = false;

        // Create the cons_info Object
        $scope.cons_info = {};
        var cons_info = constituentService.getConsRecord($scope.cons_id);
        
        cons_info.then(function(data){
            $scope.cons_info = data.data.getConsResponse;
            console.log($scope.cons_info);
        });

        // Create the Participant Progress Object
        $scope.participantProgress = {};
        var part_info = participantProgress.getProgress($scope.cons_id);
        part_info.then(function(partProgressResponse){
            $scope.participantProgress = partProgressResponse;
        });

        $scope.submitIncentives = function () {

            //Set date string
            var date = new Date();

            //Pass check-in time to Firebase
            fbIncentive.update({
                "Visited Incentives Booth":date.toDateString(),
                "Roadie Beanie":"Complete"
            });

            console.log("Parent path:",fbIncentive.parent().parent().toString());

            //Display Coney
            $scope.coney = true;

            //Return to Search
            $timeout(function(){
                $location.path('/search'); 
            }, 2000);

        }
});
