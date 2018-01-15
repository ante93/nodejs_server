var express = require("express");
var router = express.Router()
var cmd = require("node-cmd");
var mqtt_server = require("./mqtt_server");

var temperature = 0;
var humidity = 0;
var d = new Date();

// define the home page route
router.get('/', function (req, res) {
		res.render('index',{temperature: temperature, humidity: humidity, date: d});

			
	});
// define the about route
router.get('/on', function (req, res) {
    cmd.run('python3 gpio.py on');
	
			var message = {
			topic: '/leds/led1',
			payload: '1', // or a Buffer
			qos: 0, // 0, 1, or 2
			retain: false // or true
		};

		mqtt_server.publish(message, function() {
			console.log('done!');
		});
	
    res.status(200);
//	res.end();
});

router.get('/off', function (req, res) {
	
	cmd.run('python3 gpio.py off');
	
		var message = {
			topic: '/leds/led1',
			payload: '0', // or a Buffer
			qos: 0, // 0, 1, or 2
			retain: false // or true
		};

		mqtt_server.publish(message, function() {
			console.log('done!');
		});
		
		res.status(200);
	//	res.end();
});

router.get('/dht', function(req, res){

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

router.get('*', function(req, res) {
		console.log("ERROR");
		res.status(404).send('Unrecognised API call');
});

module.exports = router;
