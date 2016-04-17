//Include directly after AngularJS and app dependencies

var onlineCheckin = angular.module('onlineCheckin', ["ngRoute", "ipCookie", "firebase"]);

onlineCheckin.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/login.html",
            controller: "loginCtrl"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "loginCtrl"
        })
        .when("/search", {
            templateUrl: "views/participant-search.html",
               controller: "participantSearch"
        })
        .when("/participant/:cons_id", {
            templateUrl: "views/part-info.html",
               controller: "participantInformation"
        })
        .otherwise({
            templateUrl: "views/404.html"
        });

});

onlineCheckin.run(function($rootScope, $http, $log, $firebaseArray, firebaseGetRoster) {

    //Luminate API Settings
    $rootScope.header = {'Content-Type': 'application/x-www-form-urlencoded'};
    $rootScope.uri = "https://actnow.tofighthiv.org/site/";
    $rootScope.postdata = "&api_key=4E7231022132358DD8&v=1.0&response_format=json";
    $rootScope.sso_auth_token = "";

    //Get the TeamRaiser Roster from FirebaseGetRoster service
    $rootScope.searchResults = firebaseGetRoster;

    //Log-in states
    $rootScope.loggedIn = false;
    $rootScope.logInError = false;

    //Include the 'ipCookie' module
    // if($rootScope.sso_auth_token.length !== 0) {
    //     $rootScope.sso_auth_token = ipCookie("sso");
    //     console.log("Rootscope has a sso token equal to:");
    //     console.log($rootScope.sso_auth_token);
    //     $rootScope.loggedIn = true;
    // } else {
    //     console.log("Rootscope sees no sso cookie");
    // }

});
onlineCheckin.service('firebaseGetRoster', function($firebaseArray, $log){

    //Get Firebase O-Day App
    var fbRef = new Firebase("https://alc-oday.firebaseio.com/"),
    searchResults = $firebaseArray(fbRef.child("data"));

    searchResults.$loaded().then(function(){
        $log.info("Loaded Firebase with child data.");
    });

    return searchResults;
    
});
onlineCheckin.service('LogInteraction', function($http, $rootScope, $log) {

    //This service is used to simplify logging interactions in Controllers

    return {
        luminateServlet: "CRConsAPI",
        luminateMethod: "method=logInteraction",
        sso_auth_token: "&sso_auth_token=" + $rootScope.sso_auth_token,
        consId: "&cons_id=",
        interactionTypeId: "&interaction_type_id=1000",
        interactionSubject: "&interaction_subject=ALC-Check-In",
        interactionBody:"&interaction_body=Checked in.\n\nNotes:\n",
        log: function(cons_id,notes) {

            $http({
                method: 'POST',
                url: $rootScope.uri + this.luminateServlet,
                data: this.luminateMethod + $rootScope.postdata + this.interactionTypeId + this.interactionSubject + this.interactionBody + notes + this.consId + cons_id + this.sso_auth_token,
                headers: $rootScope.header
            })
            .then(function(responseData) {
                //Success
                $log.info("Log Interaction Successful for cons: " + cons_id);
                $log.info(responseData);
            }, function(responseData) {
                //Error
                $log.error("Log Interaction Unsuccessful");
                $log.error(responseData);
            });
        }

    } //End Return

});
onlineCheckin.filter('tel', function () {

    //This filter format's the participant's phone number fields in views/part-info.html

    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});
