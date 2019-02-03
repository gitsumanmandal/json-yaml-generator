app.controller('reviewController', function ($scope, $http) {
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
            "back": "Back",
            "confirm": "Confirm",
            "downloadLinkInfo": "Download the YAML from below link",
            "downloadLink": "DOWNLOAD",
            "goback": "GOTO DASHBOARD"
        };
        return resource;
    };
    self.resourceObject = self.fetchResource();
    self.processed = false;
    self.back = function () {
        self.showFormFunction(true);
        self.showReviewFunction(false);
    };
    self.confirm = function () {
        var jsonData = [
            {
                "nfs": {
                    "name": self.formData.nfs
                }
            },
            {
                "scm": {
                    "name": self.formData.scm,
                    "ip": self.formData.ip1
                }
            },
            {
                "buildServer": {
                    "name": self.formData.buildServer,
                    "ip": self.formData.ip2
                }
            },
            {
                "staticCodeAnalysis": {
                    "name": self.formData.staticCodeAnalysis,
                    "ip": self.formData.ip3
                }
            },
            {
                "binaryManagement": {
                    "name": self.formData.binaryManagement,
                    "ip": self.formData.ip4
                }
            },
            {
                "monitoring": {
                    "name": self.formData.monitoring,
                    "ip": self.formData.ip5
                }
            }
        ];
        /**************************************************************
        ***********COMMENT THIS OUT WHEN YOU HAVE API CALL*************/
        $http.post("http://localhost:5000/generateYAML", jsonData).then(function (response) {
            self.processed = true;
        });
        /***************************************************************
        ***************************************************************/


        /**************************************************************
        **********COMMENT THIS SECTION WHEN YOU HAVE API CALL**********/
        // alert("Form submitted, going back to dashboard");
        // windows.href = "http://localhost:5000/workspace/entrypoint-view/";
        /***************************************************************
        ***************************************************************/
    };
});