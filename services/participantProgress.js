onlineCheckin.service("participantProgress", function($http, $rootScope) {
    return {
        getProgress: function(constituentId) {
            return $http({
                method: 'POST',
                url: $rootScope.uri + "CRTeamraiserAPI",
                data: "method=getParticipantProgress" + $rootScope.postdata + "&cons_id=" + constituentId + "&fr_id=" + $rootScope.fr_id,
                headers: $rootScope.header
            }).then(function(partProgressResponse) {
                
                return partProgressResponse.data.getParticipantProgressResponse.personalProgress;

            }, function(partProgressErorr) {

                return partProgressErorr;
                console.log("Error getting trPartReponse: ", partProgressErorr);

            });
        }
    }
});
