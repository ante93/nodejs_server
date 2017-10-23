var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var cmd = require('node-cmd');

var temperature = 0;
var humidity = 0;
var d = new Date();

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

 app.get('/', function (req, res) {
    res.render('index',{temperature: temperature, humidity: humidity, date: d});
    });

app.get('/on', function (req, res) {
    cmd.run('python3 gpio.py on');
    res.status(200);
});

app.get('/off', function (req, res) {
	
	cmd.run('python3 gpio.py off');
	res.status(200);
});

app.get('/dht', function(req, res){

	cmd.get('python3 dht11.py', function(err, data, stderr){
            var parsedData = data.split(" ");
            humidity = parsedData[0];
            temperature = parsedData[1];
            res.status(200);
        }   
    );
    d = new Date();
    res.render('index',{temperature: temperature, humidity: humidity, date: d});
});

app.get('*', function(req, res) {
	console.log("ERROR");
	res.status(404).send('Unrecognised API call');
});

var server = app.listen(1234, function () { // server in ascolto sulla porta 5000

  var host = server.address().address;
  var port = server.address().port;


});
console.log("Server running");
