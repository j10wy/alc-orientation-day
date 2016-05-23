onlineCheckin.service("constituentService", function($http, $rootScope) {
    return {
        getConsRecord: function(constituentId) {
              return $http({
                method: 'POST',
                url: $rootScope.uri + "CRConsAPI",
                data: "method=getUser" + $rootScope.postdata + "&cons_id=" + constituentId + "&sso_auth_token=" + $rootScope.sso_auth_token,
                headers: $rootScope.header
            }).then(function(consResponse) {

                return consResponse;

                // $rootScope.luminate.cons_info = consResponse.data.getConsResponse;

                // var customBooleans = $rootScope.luminate.cons_info.custom.boolean;
                // var customStrings = $rootScope.luminate.cons_info.custom.string;

                // $rootScope.groupArray = [].concat(customBooleans, customStrings);
                // console.log("Group array:", $rootScope.groupArray);

                // //Angular forEach testing Custom Strings
                // angular.forEach($rootScope.groupArray, function(value, key) {

                //     var cons_customId = value.id;
                //     var cons_customContent = value.content;

                //     switch (cons_customId) {

                //         case "custom_boolean13":
                //             // Bike Parking boolean
                //             $rootScope.luminate.bikeParking = (cons_customContent === "true") ? true : false;
                //             break;

                //         case "custom_string3":
                //             // Roadie Team Assignment
                //             $rootScope.luminate.roadieTeamAssignment = cons_customContent;
                //             break;

                //         case "custom_string5":
                //             // Roadie Team Captain
                //             $rootScope.luminate.roadieTeamCaptain = cons_customContent;
                //             break;

                //         case "custom_string9":
                //             // Meal Preference
                //             $rootScope.luminate.tentAddress = cons_customContent;
                //             console.log("tentAddress:",$rootScope.luminate.tentAddress);
                //             break;    

                //         case "custom_string11":
                //             // Meal Preference
                //             $rootScope.luminate.mealPreference = cons_customContent;
                //             break;

                //         case "custom_string14":
                //             // Tent Keyword
                //             $rootScope.luminate.tentKeyword = cons_customContent;
                //             break;

                //         case "custom_string16":
                //             // ALC Representitive
                //             $rootScope.luminate.alcRep = cons_customContent;
                //             break;    

                //         case "custom_string19":
                //             // ALC Region
                //             $rootScope.luminate.alcRegion = cons_customContent;
                //             break;
                            
                //         case "custom_string30":
                //             // ALC Region
                //             $rootScope.luminate.shirtSize = cons_customContent;
                //             break;    
                //     }
                // });

                // console.log("Constituent Information", $rootScope.luminate.cons_info);
                // console.log("Bike Parking:", $rootScope.luminate.bikeParking);

            }, function(consResponseErorr) {

                console.log("Error getting Constituent Information", consResponseErorr);

            });
        }
    }
});
