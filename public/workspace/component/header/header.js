app.controller('headerController', function ($scope, $http) {
    var self = $scope;
    self.fetchResource = function () {
        var resource = {
            "headerName": "Playbook Generator"
        };
        return resource;
    };
    self.resourceObject = self.fetchResource();
});