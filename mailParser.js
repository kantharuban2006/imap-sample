module.exports = MailParser 
var Imap = require('imap'),XOauth = require('gmail-xoauth');
    inspect = require('util').inspect;
var fs = require('fs'), fileStream;
var imap; 
var result = [];
var xoauth_gen = new XOauth("ea537513aef71d7f8ffc215ef35ea0b9267a6e48", "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCV6v2R+HFQuidg\nKpU3S+Aw1cksqLUXMqWm9Sx432Ro2lB5STjIZSKQxXGP94dKclHFs5qgM/+yD+QC\nEI+KxYVRKaHG/mVQJmjXsrcjKthUujGNOeR0G6a6KpPMBBRaFUTm0zw2lSjtAuhC\ngCAi9uPfAoRW2esOi3qpAQCwq5+uIALkHd74IfUjLnLtJTIKl8PGAQbgc2+uXm0K\n7fOUZqRKhxYLzCdYY05VtAPsNfBBvDRc2J+TSyW/JK3Qwl0b+oCbURlXOnNNWK0I\n6PF1nsjXLQVOJt6EFkVUmO9rvFiWyQJLNwO/KrvMK/csfkEInGNpNuBSFI1S8oel\n6mtCZGVNAgMBAAECggEAb66NlA6Wq+LhrnxKiNUXgIniwkg0D8IFMal3pdwVex8X\n0CLCEFd3No5AGVX3DXi4fiVcTXgvRcEcxIT9yg13UY1IHWwqoVjbxcQ3NhWW7xd+\nDo1QKUboH8vUKqnnV2x81dALDUZ1JIuD5vZ3+lQeUWYYnHLe7wjtKbW7g+F2pUnC\nW04xRdhMrjavLP85Kqvaqy9iGuFtDNGjfYh8jVv2EpGkNfcMsy8d8pCz6GXojRY3\nJpwCsVxLSInYxm4zds5Oaj/6uTSLs6vpSwtJZxQJP1QfRF3kS6MczvfUPvRVNfiA\nG3OYAxFrk3dXRwB9Ej0Yz+m4E4qMiLRE1kTGri3NAQKBgQDX2u850KJko6VqNLm+\n8BDDq8B+MzG+Y0YaJsSstcp3pZwF2ZwAGjMOcXzLTcn4q+iQi63DfmQhfnwbQMqk\nHg7QcYkX83VlSvRzxNcsgUsEU9XuMoWH57E6O0vsdo4R3zpInvpXLkwcG6o2ztB0\nO6XLjBV/CInU/36nnPR9ZaSZLQKBgQCxzLipmcHZugvHljrR+GL1tFPy/k2d4WcU\nggtV9haCVNHGW84AUvw8/PuW1DX+47h/hFfv0lX0vOHosPciymt6LD5g4PqQxYQc\nHgedktJC0p2Esf+SW7apdAga5/bJyxtgpfTx/1KOFmeqimBEx4phzuAr5BYtQBQs\nKGnWe0pQoQKBgFx4CqFe0iKAxDzyJ1w3ZUcdjZHChp3D02UilIBURE7rICKVbTHS\nB2s5jLdfNJWVt0QswhyMSYLbt3jJUcXqpnf/GzaqcfEZogzyFyeWn7dT3sJy3Ccz\nRwXmHwlGZGgdk89GY4HzcGFeLJXcFQql/slq0k6gLsOTTAOrxkTtxQxlAoGADup3\ny3KkuplLB7Foudi2pJo+OLJw3H/eX/AQ92MvvDtVZeipvYk4s/0dNigTZ5C/F6OI\npQvmPiPiZ90AvqBwp80yZno5Sw/m51z1kpiQnx6ALHOqVyLujgS38VnocEFjyJXj\nmLGswVLL25jEPsDmsRHj6Iq3+Y/YoWO6jU3GjEECgYASH7MwKEevxbbPCnC3v+Wc\nGkmJIx4o154sliCzVrVEpMBomPfdx/x1cQSDqLOUNvNjgBEvPBtOncMAvs96iU04\nwpXl3L0fjH9H3e1LEEeH0j+YCt802Tht0f7SKOorANU64dYGiizvs9tGx13WBfXg\nSOHHO/+eOELOnLMUc3Ix2g==\n-----END PRIVATE KEY-----\n");

    console.log("xoauth gen:"+JSON.stringify(xoauth_gen));


function MailParser(mailid,passwordProvided,imaphost){
result= [];
imap = new Imap({
  user: mailid,
  password: passwordProvided,
  host: imaphost,
  
  //user: 'kantharuban2006@gmail.com',
  //password: 'elie535455',
  //host: 'imap.gmail.com',
  xoauth:xoauth_gen,
  
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false }
});
};

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}


MailParser.prototype.connectMail = function connection()
{
	imap.connect();
	imap.once('ready', function() {

openInbox(function(err, box) {
  if (err) throw err;
  imap.search([ 'ALL', ['TEXT','intros'] ], function(err, results) {
    if (err) throw err;
    var f = imap.fetch(results, { bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)','TEXT'] });
    f.on('message', function(msg, seqno) {
      var prefix = '(#' + seqno + ') ';
	  
      msg.on('body', function(stream, info) {
        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
		
	if (info.which === 'TEXT')
        	console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
		
	var buffer = '', count = 0;
	stream.on('data', function(chunk) {
        	count += chunk.length;
        	buffer += chunk.toString('utf8');
       		});
	  
	stream.once('end', function() {
        if (info.which !== 'TEXT')
	{
          	//console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
		  result.push(prefix, inspect(Imap.parseHeader(buffer)));
		  console.log(JSON.stringify(result));	  
	}
        else
	{
          	console.log(prefix + 'Body [%s] Finished', inspect(info.which));
	}
		  
	});
	});
		
    });
    f.once('error', function(err) {
      	console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      	console.log('Done fetching all messages!');
      	imap.end();
	return result;
	  
    });
  });
});
});


imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});
	
};
