alcStarter.service("tentMateService", function($http, $rootScope) {

        return {
            getTentMate: function() {
                $http({
                    method: 'POST',
                    url: $rootScope.luminate.uri + "CRTeamraiserAPI",
                    data: "method=getTentmate" + $rootScope.luminate.postdata + "&sso_auth_token=" + $rootScope.luminate.token + "&fr_id=" + $rootScope.luminate.fr_id,
                    headers: $rootScope.luminate.header
                }).then(function(tentMateResponse) {

                    $rootScope.luminate.tentMate = tentMateResponse.data.getTentmateResponse.record;
                    console.log("Tent-mate information:", $rootScope.luminate.tentMate);

                }, function(tentMateResponseErorr) {

                    console.log("Error getting TeamRaiser Registration:", tentMateResponseErorr);

                });
            }
        }
    });