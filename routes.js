var express = require('express');
var router = express.Router();
var YAML = require('json2yaml');
var writeFile = require('write-file');
var readFile = require('read-file');

router.post('/getTask', function (req, res) {
  var taskArray = req.body;
  var flexibleTaskArray = [];
  readFile('public/repository/storage.json', 'utf8', function (err, buffer) {
    var bufferObject = JSON.parse(buffer);
    var spliceIndex = 0;
    var returnArray = [];
    for (var j = 0; j < taskArray.length; j++) {
      var taskId = taskArray[j].qryID;
      spliceIndex++;
      for (var i = 0; i < bufferObject.length; i++) {
        if (bufferObject[i].id == taskId) {
          var returnObj = {};
          returnObj.name = bufferObject[i].name;
          returnObj.description = bufferObject[i].description;
          returnObj.id = bufferObject[i].id;
          returnObj.object = bufferObject[i].object;
          spliceIndex--;
          returnArray.push(returnObj);
          break;
        }
      }
      if (spliceIndex == 1) {
        flexibleTaskArray.push({ 'id': taskArray[j].qryID });
        spliceIndex--;
      }
    }
    if (flexibleTaskArray.length != 0) {
      res.status(200).send({ data: flexibleTaskArray, status: "ERROR" });
    }
    else {
      res.status(200).send({ data: returnArray, status: "SUCCESS" });
    }
  });
});

router.delete('/removeItem', function (req, res) {
  var taskId = req.query.taskId;
  readFile('public/repository/storage.json', 'utf8', function (err, buffer) {
    var bufferObject = JSON.parse(buffer);
    var newDataList = [];
    for (var i = 0; i < bufferObject.length; i++) {
      if (bufferObject[i].id != taskId) {
        var obj = {
          "name": bufferObject[i].name,
          "description": bufferObject[i].description,
          "id": bufferObject[i].id
        };
        newDataList.push(obj);
      }
    }
    writeFile('public/repository/storage.json', newDataList, function (err) {
      if (err) {
        res.status(400).send({ status: "ERROR" });
      }
      else {
        res.status(200).send({ status: "DELETED SUCCESSFULLY" });
      }
    });
  });
});

router.get('/getRepository', function (req, res) {
  readFile('public/repository/storage.json', 'utf8', function (err, buffer) {
    var bufferObject = JSON.parse(buffer);
    res.status(200).send({ data: bufferObject, status: "SUCCESS" });
  });
});

router.post('/generate', function (req, res) {
  var responseObject = req.body.mainObject;
  var repoArticle = req.body.taskData;
  var yamlText = YAML.stringify(responseObject);
  var taskID = Math.floor(Math.random() * 100000000) + Math.floor(Math.random() * 100000000) + Math.floor(Math.random() * 100000000);
  var jsonStatus = false;
  var yamlStatus = false;
  writeFile('public/json/json' + taskID + '.json', responseObject, function (err) {
    if (err) {
      // console.log("JSON ERROR"+err);
      jsonStatus = false;
    }
    else {
      // console.log("JSON SUCCESS"+err);
      jsonStatus = true;
    }
    writeFile('public/yaml/yaml' + taskID + '.yaml', yamlText, function (err) {
      if (err) {
        // console.log("YAML ERROR"+err);
        yamlStatus = false;
      }
      else {
        // console.log("YAML SUCCESS"+err);
        yamlStatus = true;
      }
      readFile('public/repository/storage.json', 'utf8', function (err, buffer) {
        var bufferObject = JSON.parse(buffer);
        repoArticle.id = taskID;
        repoArticle.object = responseObject;
        bufferObject.push(repoArticle);
        writeFile('public/repository/storage.json', bufferObject, function (err) {
          /*
          FINAL RESULT 
           */
          if (jsonStatus && yamlStatus) {
            res.status(200).send({ taskID: taskID, status: "SUCCESS" });
          }
          else {
            res.status(400).send({ taskID: taskID, status: "ERROR" });
          }
        });
      });
    });
  });
});

module.exports = router;