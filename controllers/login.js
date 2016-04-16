onlineCheckin.controller('loginCtrl', function($scope, $log, $http, $rootScope, ipCookie) {

    $scope.loginSubmit = function() {

            var luminateServlet = "CRConsAPI",
                luminateMethod = "method=login",
                username = "&user_name=" + $scope.username,
                password = "&password=" + $scope.password;

            $http({
                method: 'POST',
                url: $rootScope.uri + luminateServlet,
                data: luminateMethod + $rootScope.postdata + username + password,
                headers: $rootScope.header
            }).then(function(responseData) {
                //Success
                $log.info("Login successful!");
                $rootScope.sso_auth_token = responseData.data.loginResponse.token;
                $log.info("auth",$rootScope.sso_auth_token)

                // ipCookie("sso", $rootScope.sso_auth_token, {
                //     expirationUnit: 'minutes',
                //     expires: 14.5
                // });

                $rootScope.loggedIn = true;
                $rootScope.logInError = false;

            }, function(responseData) {
                //Error
                $log.warn("Login unsuccessful!");
                $log.error(responseData);
                $rootScope.loggedIn = false;
                $rootScope.logInError = true;
            });

        } //end loginSubmit

});
