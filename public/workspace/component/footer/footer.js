app.controller('footerController', function ($scope, $http) {
    var self = $scope;
    self.fetchResource = function () {
        var resource = {
            "copyright": "Copy Rights Reserved by Suman",
            "goToTop": "Go to top"
        };
        return resource;
    };
    self.resourceObject = self.fetchResource();
    self.goToTop = function () {
        $("html").animate({ scrollTop: 0 }, "slow");
    };
});