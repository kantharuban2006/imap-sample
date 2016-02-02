module.exports = md5Converter
var crypto = require('crypto');
var data = "kantharuban2006@gmail.com";
function md5Converter()
{
};

md5Converter.prototype.getHashForAMail = function getHash(mailid)
{
	var data = mailid;	
	var md5Result = crypto.createHash('md5').update(mailid).digest("hex");
	console.log('md5 equivalent of '+data+ ' is ' +md5Result );
	return md5Result;
};