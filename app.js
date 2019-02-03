var express = require("express");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var routes = require('./routes.js');
app.set('port', (process.env.PORT || 5000));
app.use(cookieParser());
app.use(session({ secret: "SECRET", resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.listen(app.get('port'), function () {
console.log("NODE RUNNING AT LOCALHOST:" + app.get('port'))
});