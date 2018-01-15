var express = require('express');
var app = express();
var cmd = require('node-cmd');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var mqtt_server = require("./mqtt_server");
var route = require("./router");

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.use(route, function(){});
//app.use(mqtt_server, function(){});




var server = app.listen(1234, function () {

  var host = server.address().address;
  var port = server.address().port;

});

console.log("Server running");
