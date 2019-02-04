app.controller('formController', function ($scope, $http) {
    var self = $scope;
    self.fetchResource = function () {
        var resource = {
            "repoHeaderName": "Repository",
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
    self.row = [];
    var mainObject = {};
    self.isDownloadClicked = false;
    self.taskName = null;
    self.taskDescription = null;
    self.repository = [];
    self.clickedTask = null;
    self.clickedTaskName = null;
    self.clickedTaskDescription = null;

    self.reset = function () {
        location.reload();
    };

    self.formLoaded = function () {
        var obj = {
            'rowId': self.row.length,
            'rowKey': null,
            'rowValue': null,
            'isValueObject': false,
            'isLast': true
        };
        self.row.push(obj);
        $http.get("https://json-yaml-generator.herokuapp.com//getRepository").then(function (response) {
            self.repository = response.data.data;
        });
    };

    self.addSibling = function () {
        var obj = {
            'rowId': self.row.length,
            'rowKey': null,
            'rowValue': null,
            'isValueObject': false,
            'isLast': true
        };
        self.row[self.row.length - 1].isLast = false;
        self.row.push(obj);
    };

    self.remove = function (data) {
        var newDataList = [];
        self.selectedAll = false;
        for (var i = 0; i < self.row.length; i++) {
            if (data.rowId != self.row[i].rowId) {
                var obj = {
                    'rowId': newDataList.length,
                    'rowKey': self.row[i].rowKey,
                    'rowValue': self.row[i].rowValue,
                    'isValueObject': self.row[i].isValueObject,
                    'isLast': false
                };
                newDataList.push(obj);
            }
        }
        newDataList[newDataList.length - 1].isLast = true;
        self.row = newDataList;
    };

    self.generateModal = function () {
        for (var j = 0; j < self.row.length; j++) {
            if (self.row[j].rowKey == null) {
                return;
            }
        }
        $('#generateModal').modal('toggle');
    };

    self.callDownloadModal = function (id) {
        self.clickedTask = id;
        $('#downloadModal').modal('toggle');
    };

    self.callRemoveModal = function (id) {
        self.clickedTask = id;
        $('#removeModal').modal('toggle');
    };

    self.generateSubModule = function (data) {
        mainObject = {};

        if (data == null) {
            for (var i = 0; i < self.row.length; i++) {
                mainObject[self.row[i].rowKey] = self.row[i].rowValue;
            }
        }
        else{
            for (var i = 0; i < self.row.length; i++) {
                if (self.row[i].isValueObject) {
                    for(var j = 0; j < data.length; j++){
                        if(self.row[i].rowValue == data[j].id){
                            mainObject[self.row[i].rowKey] = data[j].object;
                            break;
                        }
                    }
                }
                else{
                    mainObject[self.row[i].rowKey] = self.row[i].rowValue;
                }
            }
        }

        var payload = {
            mainObject: mainObject,
            taskData: {
                name: self.taskName,
                description: self.taskDescription
            }
        };
        $http.post("https://json-yaml-generator.herokuapp.com//generate", payload).then(function (response) {
            $http.get("https://json-yaml-generator.herokuapp.com//getRepository").then(function (response) {
                self.repository = response.data.data;
                $('#generateModal').modal('toggle');
            });
        });
    };

    self.generate = function () {
        var taskArray = [];
        var varFlag = false;
        for (var i = 0; i < self.row.length; i++) {
            if (self.row[i].isValueObject) {
                var obj = {
                    qryID: self.row[i].rowValue
                };
                taskArray.push(obj);
                varFlag = true;
            }
        }
        if (varFlag) {
            $http.post("https://json-yaml-generator.herokuapp.com//getTask", taskArray).then(function (response) {
                if (response.data.status == "ERROR") { }
                else {
                    self.generateSubModule(response.data.data);
                }
            });
        }
        else {
            self.generateSubModule(null);
        }
    };

    self.hoverDownload = function (index) {
        self.repository[index].isDownloadClicked = true;
    };

    self.leaveDownload = function (index) {
        self.repository[index].isDownloadClicked = false;
    };

    self.removeTask = function () {
        $http.delete("https://json-yaml-generator.herokuapp.com//removeItem?taskId=" + self.clickedTask).then(function (response) {
            $http.get("https://json-yaml-generator.herokuapp.com//getRepository").then(function (response) {
                self.repository = response.data.data;
                $('#removeModal').modal('toggle');
            });
        });
    };

    self.downloadFile = function (fileType) {
        $(document).ready(function () {
            var file = fileType + "/" + fileType + self.clickedTask + "." + fileType;
            $("#anchorDownload")[0].href = "../../" + file;
            $('#anchorDownload')[0].click();
        });
    };

    self.view = function (id) {
        $(document).ready(function () {
            var fileType = "json";
            var file = fileType + "/" + fileType + id + "." + fileType;
            $("#anchorTarget1")[0].href = "../../" + file;
            $('#anchorTarget1')[0].click();
        });
    };

    self.setCopy = function (id) {
        var copyText = document.getElementById(id);
        copyText.select();
        document.execCommand("copy");
    };

    self.showDetails = function (name, description) {
        self.clickedTaskName = name;
        self.clickedTaskDescription = description;
        $('#viewTaskModal').modal('toggle');
    };

});
