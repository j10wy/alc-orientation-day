//Include after app module and participant-search.js
onlineCheckin.controller('participantInformation', function($scope, $http, $rootScope, $log, $uibModalInstance, participant) {

    //ALC Options
    var header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri = "https://actnow.tofighthiv.org/site/",
        postdata = "&api_key=4E7231022132358DD8&v=1.0&response_format=json";

    $scope.checkInButtonDisable = true;
    $scope.selected = participant;

    $scope.printBadge = function() {
        //window.print();
        $scope.checkInButtonDisable = false;
    };

    $scope.ok = function() {

        var luminateServlet = "CRConsAPI",
            luminateMethod = "method=logInteraction",
            sso_auth_token = "&sso_auth_token=" + $rootScope.sso_auth_token,
            //What is the consId?
            consId = "&cons_id=" + $scope.selected.consInfo.cons_id,
            interactionTypeId = "&interaction_type_id=1000",
            interactionSubject = "&interaction_subject=" + $rootScope.interactionSubject,
            interactionBody = "&interaction_body=Checked in.\n\nNotes:\n" + $scope.notes;

        $http({
            method: 'POST',
            url: uri + luminateServlet,
            data: luminateMethod + postdata + interactionTypeId + interactionSubject + interactionBody + consId + sso_auth_token,
            headers: header
        }).then(function(responseData) {
            //Success
            $log.info("Log Interaction Successful for cons: " + $scope.selected.consInfo.cons_id);
            $log.info(responseData);
            $uibModalInstance.close($scope.selected);
        }, function(responseData) {
            //Error
            $log.error("Log Interaction Unsuccessful");
            $log.error(responseData);
        });

        //Zapier
        $http({
            method: 'POST',
            url: "https://zapier.com/hooks/catch/238id3/",
            data: "first=" + $scope.selected.first + "&last=" + $scope.selected.last + "&type=" + $scope.selected.type + "&email=" + $scope.selected.consInfo.email.primary_address + "&region=" + $scope.selected.consInfo.custom.string[14].content,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(responseData) {
            //Success
            $log.info("Zapier task successful for: " + $scope.guest.firstName + " " + $scope.guest.lastName);
            $log.info(responseData);
        }, function(responseData) {
            //Error
            $log.error("Zapier task unsuccessful");
            $log.error(responseData);
        });
    };

    $scope.cancel = function() {
        $rootScope.badgeInformation = {};
        $uibModalInstance.dismiss('cancel');
    };
});