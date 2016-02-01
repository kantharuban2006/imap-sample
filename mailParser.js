module.exports = MailParser 
var Imap = require('imap'),
    inspect = require('util').inspect;
var fs = require('fs'), fileStream;
var imap; 
var result = [];
function MailParser(){
result= [];
imap = new Imap({
  user: 'kantharuban2006@yahoo.com',
  password: 'elie535455',
  host: 'imap.mail.yahoo.com',
  
  //user: 'kantharuban.s@payoda.com',
  //password: 'mailpassword',
  //host: 'imap.gmail.com',
  
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
      //console.log('Message #%d', seqno);
      var prefix = '(#' + seqno + ') ';
	  
      msg.on('body', function(stream, info) {
        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
		
		if (info.which === 'TEXT')
        console.log(prefix + 'Body [%s] found, %d total bytes', inspect(info.which), info.size);
		
		var buffer = '', count = 0;
		stream.on('data', function(chunk) {
        count += chunk.length;
        buffer += chunk.toString('utf8');
        /*if (info.which === 'TEXT')
          console.log(prefix + 'Body [%s] (%d/%d)', inspect(info.which), count, info.size);*/
		});
	  
		stream.once('end', function() {
        if (info.which !== 'TEXT')
		{
          //console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
		  result.push(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
		  console.log(JSON.stringify(result));
		  }
        else
          console.log(prefix + 'Body [%s] Finished', inspect(info.which));
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