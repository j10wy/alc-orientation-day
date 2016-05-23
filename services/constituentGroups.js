alcStarter.service("constituentGroupsService", function($http, $rootScope) {
        return {
            getGroups: function() {
                $http({
                    method: 'POST',
                    url: $rootScope.luminate.uri + "CRConsAPI",
                    data: "method=getUserGroups" + $rootScope.luminate.postdata + "&sso_auth_token=" + $rootScope.luminate.token + "&cons_id=" + $rootScope.luminate.cons_id,
                    headers: $rootScope.luminate.header
                }).then(function(grpResponse) {

                    $rootScope.luminate.grp_info = grpResponse.data.getConsGroupsResponse.group;

                    angular.forEach($rootScope.luminate.grp_info, function(value, key) {

                        var convioGroupId = value.id;

                        //Assign POM time to groups object.
                        switch (convioGroupId) {
                            case "140737":
                                $rootScope.luminate.groups.pom = "9:00 AM";
                                break;
                            case "140738":
                                $rootScope.luminate.groups.pom = "11:00 AM";
                                break;
                            case "140739":
                                $rootScope.luminate.groups.pom = "2:00 PM";
                                break;
                            case "140740":
                                $rootScope.luminate.groups.pom = "4:00 PM";
                        }
                        //The group ID for the ALC Medform Complete group. Needs to be updated each year.
                        if (convioGroupId === "140719") {
                            $rootScope.luminate.groups.med_form = true;
                        }

                        //The group ID for participants with open incentives. Needs to be updated going into Orientation Day
                        if (convioGroupId === "140762") {
                            $rootScope.luminate.groups.incentive_pickup = true;
                        }
                    });

                    //console.log($rootScope.luminate.grp_info);
                    console.log("Orientation Groups:",$rootScope.luminate.groups);

                }, function(grpResponseErorr) {
                    console.log("Error getting grpResponse: ", grpResponseErorr);
                });
            }
        }

    });