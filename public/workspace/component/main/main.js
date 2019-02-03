app.controller('mainController', function ($scope, $http) {
    var self = $scope;
    self.fetchResource = function () {
        var resource = {
            "headerName": "Oracle Application",
            "nfs": "N.F.S",
            "scm": "SCM",
            "buildServer": "Build Server",
            "staticCodeAnalysis": "Static Code Analysis",
            "binaryManagement": "Binary Management",
            "monitoring": "Monitoring",
            "ipAddress": "IP Address",
            "reset": "Reset",
            "submit": "Submit",
            "selectOption": "Select an option",
            "back": "Back",
            "confirm": "Confirm"
        };
        return resource;
    };
    self.resourceObject = self.fetchResource();

    self.showForm = true;
    self.showReview = false;
    self.reviewData = [];
    self.showReviewFunction = function (flag) {
        self.showReview = flag;
    };
    self.showFormFunction = function (flag) {
        self.showForm = flag;
    };
});