# imap-sample
imap-sample 

There is a mail parser which does the connectivity to the provided mail id with the credentials and fetches the mails based on the textual search in the mail. It displays the FROM, TO ,DATE and the SUBJECT of the mails resulted during the search. The results are populated in JSON format.

It has a md5Converter which manipulates the provided mail id and calculates the md5 sum, the outcome of the md5Converter can be used for the gravatar website to get the profile picture of the mailid if of interest.

In order to run the test and get the results shown in console, start.js is the file to be run in nodejs.
When the start.js is launched, it provides the results in the console as well as the files are created in the project location itself.

index.js file takes care of the web trigger point for the POC , if need it can be also used.
provide the details of mailid and required credentials in the necessary files(mailParser.js and index.js).Run the index.js file in the local using the node command. Once, the index.js is running just access the local web browser as a trigger point to fetch the details(http://localhost:5000). The results will be stored as files in the project location itself.

