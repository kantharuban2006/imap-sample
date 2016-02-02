var express = require('express');
var mailParser = require("./mailParser.js");
var md5 = require("./md5Converter.js");
var app = express();
var http = require('http');
var fs = require('fs');
	
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {

	var mailP = new mailParser();
	response.contentType('application/json');
	var outcome= [];
	
	outcome = mailP.connectMail();
	console.log('Outcome:'+outcome);
	response.send('Please check the project location for the results as files, check console for filtered results');
	
	var md5gen = new md5();
	var resultmd5 = md5gen.getHashForAMail("someone@gmail.com");
	console.log('resulting md5:'+resultmd5);
	
    var url = "http://www.gravatar.com/avatar/"+resultmd5+".jpg";
	var dest = "image.jpg";

	var file = fs.createWriteStream(dest);
	var request = http.get(url, function(response) {
	response.pipe(file);
	});
	
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


