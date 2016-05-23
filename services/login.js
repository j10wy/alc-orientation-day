alcStarter.service('loginService', function($http, $rootScope) {

        return {
            data: {},
            getLogin: function(username, password) {
                self = this;
                $http({
                    method: 'POST',
                    url: $rootScope.luminate.uri + "CRConsAPI",
                    data: "method=login" + $rootScope.luminate.postdata + "&user_name=" + username + "&password=" + password,
                    headers: $rootScope.luminate.header
                }).success(function(data) {
                    console.log(data.loginResponse);
                    self.data = data.loginResponse;
                    return self.data;
                }).error(function(error) {
                    console.log(error.errorResponse.message);
                });
            }
        }

    });