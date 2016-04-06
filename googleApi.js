var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var CLIENT_ID = "";
var CLIENT_SECRET = "";
var REDIRECT_URL = "";
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var drive = google.drive({ version: 'v2', auth: oauth2Client });
