// Include after app module and participant-search.js
onlineCheckin.controller('participantInformation', function($scope, $timeout, LogInteraction, constituentService, $http, $rootScope, $log, $routeParams, $location, $firebaseArray, $firebaseObject) {

    // Get the participant's Consituent ID from the URL
    $scope.cons_id = $scope.$routeParams = $routeParams.cons_id;
    $scope.alcnum = "";

    // GET Participant's info from Firebase data
    var fbCons = new Firebase("https://alc-oday.firebaseio.com/data/" + $scope.cons_id);
    $scope.fireBaseCons = $firebaseObject(fbCons);

    $scope.fireBaseCons.$loaded(function() {
        console.log("** FIREBASE CONS **:", $scope.fireBaseCons.alcnum);
        $scope.alcnum = $scope.fireBaseCons.alcnum;
    });

    // Initialize notes field, waiver, and set Coney Success image to false
    $scope.notes = ""
    $scope.waiver = false;
    $scope.coney = false;

    // Create the cons_info Object
    $scope.cons_info = {};

    var test = constituentService.getConsRecord($scope.cons_id);

    test.then(function(data) {
        $scope.cons_info = data.data.getConsResponse;
        console.log("CONS:", $scope.cons_info);
        console.log("ROOT:", $rootScope);

        var customBooleans = $scope.cons_info.custom.boolean;
        var customStrings = $scope.cons_info.custom.string;

        $scope.groupArray = [].concat(customBooleans, customStrings);
        console.log("Group array:", $scope.groupArray);

        //Angular forEach testing Custom Strings
        angular.forEach($scope.groupArray, function(value, key) {

            var cons_customId = value.id;
            var cons_customContent = value.content;

            switch (cons_customId) {

                case "custom_boolean3":
                    // Medical Form Complete
                    $scope.medform = cons_customContent === "true" ? "Yes" : "No";
                    break;

                case "custom_boolean13":
                    // Bike Parking boolean
                    $scope.donorServices = (cons_customContent === "true") ? true : false;
                    break;

                case "custom_string3":
                    // Roadie Team Assignment
                    $scope.roadieTeamAssignment = cons_customContent;
                    break;

                case "custom_string5":
                    // Roadie Team Captain
                    $scope.roadieTeamCaptain = cons_customContent;
                    break;

                case "custom_string9":
                    // Tent Address
                    $scope.tentAddress = cons_customContent;
                    break;

                case "custom_string11":
                    // Meal Preference
                    $scope.mealPreference = cons_customContent;
                    break;

                case "custom_string14":
                    // Tent Keyword
                    $scope.tentKeyword = cons_customContent;
                    break;

                case "custom_string19":
                    // ALC Region
                    $scope.alcRegion = cons_customContent;
                    break;
            }
        });

        console.log("Complete Scope:", $scope);

    });

    $scope.checkIn = function() {

        var fbCheckin = new Firebase("https://alc-oday.firebaseio.com/checkin");

        //Set date string
        var date = new Date().toDateString();
        var checkinObject = {
           medform: $scope.medform,
           donorServices: $scope.donorServices,
           tentAddress: $scope.tentAddress,
           waiver: $scope.waiver,
           checkinTime: date
        }

        //Log a check-in interaction in Luminate
        LogInteraction.log($scope.cons_id, $scope.notes);

        //Pass check-in time to Firebase
        fbCheckin.child($scope.cons_id).update(checkinObject);

        console.log("Parent path:", fbCons.parent().parent().toString());

        //Display Coney
        $scope.coney = true;

        //Return to Search
        $timeout(function() {
            $location.path('/search');
        }, 1000);

    }
});
