var express = require('express');
var mailParser = require("./mailParser.js");
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  //response.send('-Hello User, This is a basic test for Heroku usage-');
	var mailP = new mailParser();
	//response.contentType('application/json');
	var outcome= [];
	outcome = mailP.connectMail();
	console.log('Outcome:'+outcome);
	response.send( 'result:'+outcome);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


