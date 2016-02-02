var mailParser = require("./mailParser.js");
var md5 = require("./md5Converter.js");
var http = require('http');
var fs = require('fs');

	var mailP = new mailParser('someone@yahoo.com','password','imap.mail.yahoo.com');
	var outcome= [];
	
	outcome = mailP.connectMail();
	//console.log();
	
	var md5gen = new md5();
	var resultmd5 = md5gen.getHashForAMail("someone@gmail.com");
	console.log('resulting md5:'+resultmd5);
	
    var url = "http://www.gravatar.com/avatar/"+resultmd5+".jpg";
	var dest = "image.jpg";

	var file = fs.createWriteStream(dest);
	var request = http.get(url, function(response) {
	response.pipe(file);
	});