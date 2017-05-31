var angularModule = angular.module('json-sample', []);
angularModule.controller('jsonController', function ($scope, $http) {
    $scope.user = {};
    $scope.savedUsers = [];
    //$scope.getSavedUsers();
    (function getSavedUsers() {
        $http.get('http://localhost:5000/tasks').then(function (response) {
            $scope.savedUsers = response;
            console.log($scope.savedUsers.data)
        }).catch(function (ex) {
            console.log('Exception is ::::  ', ex);
        })
    }());
    $scope.saveUser = function () {
        var self = this;
        console.log(" coming in Click Handler ", $scope.user);
        if ($scope.user.id) {
            var url = 'http://localhost:5000/tasks/' + $scope.user.id;
            $http.put(url, $scope.user).then(function (response) {
                console.log(response);
                return response
            }).then(function (json) {
                console.log('parsed json: ', json)
            }).catch(function (ex) {
                console.log('parsing failed: ', ex)
            });
        }
        else {
            $http.post('http://localhost:5000/tasks', $scope.user).then(function (response) {
                console.log(response);
                return response
            }).then(function (json) {
                console.log('parsed json: ', json)
            }).catch(function (ex) {
                console.log('parsing failed: ', ex)
            });
        }
        //getSavedUsers();
    }
    $scope.deleteUser = function (id) {
        var self = this;
        console.log("Selected User Id is ", id);
        var url = 'http://localhost:5000/tasks/' + id;
        $http.delete(url, $scope.user).then(function (response) {
            console.log(response);
            return response;
            //self.getSavedUsers();
        }).then(function (json) {
            console.log('parsed json: ', json)
        }).catch(function (ex) {
            console.log('parsing failed: ', ex)
        });
        
    }
    $scope.modifyUser = function (modifyUser) {
        $scope.user = modifyUser;
        console.log("Selected User is ", modifyUser);
    }
});