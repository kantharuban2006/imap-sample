module.exports = s3Bucket_upload

var AWS = require('aws-sdk');
var s3 = require('s3');
var fs = require("fs");


function s3Bucket_upload()
{
};

s3Bucket_upload.prototype.uploadToS3 = function upload(file, remoteFolderName,localFoldedPath) {

  var client = s3.createClient({
  maxAsyncS3: 20,    // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 104857600, // this is the default (100 MB)
  multipartUploadSize: 104857600, // this is the default (100 MB)
  
  s3Options: {
    accessKeyId: 'mykey',
    secretAccessKey: 'mySeckey'

  },
 });
 
 
  console.log("folder"+remoteFolderName+'/'+file);
  var params = {
  	localFile: localFoldedPath+file,

  	s3Params: {
  		Bucket: 'myBucket',
  		Key: remoteFolderName+'/'+file,

  	},
  };
  
  
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
  	console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
  	console.log("#");
  });
  uploader.on('end', function() {
    fs.unlinkSync(params.localFile);
  	console.log("done uploading", file , 'to ', params.s3Params.Key);
  });

 
 };