var googleapis = require('googleapis'),
JWT = googleapis.auth.JWT;

var serviceEmail = 'intros@dulcet-listener-126405.iam.gserviceaccount.com';
var serviceKeyFile = __dirname + '/key.pem';
var subject = '';

var authClient = new JWT(
serviceEmail,
serviceKeyFile,
null,
['https://www.googleapis.com/auth/gmail.readonly'],
'kanth.ruban@gmail.com',
subject
);

authClient.authorize(function(err, tokens) {
if (err) {
    console.log(err);
    return;
}

console.log(tokens);

var gmail = googleapis.gmail({ auth: authClient, version: 'v1' });

var emails = gmail.users.messages.list({
    includeSpamTrash: false,
    maxResults: 5,
    q: "",
    userId: "kanth.ruban@gmail.com"
}, function (err, results) {
    console.log(err);
    console.log(results);
});
});