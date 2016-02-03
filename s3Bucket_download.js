module.exports = s3Bucket_download

var AWS = require('aws-sdk');
var s3 = require('s3');
var fs = require("fs");


function s3Bucket_download()
{
};

s3Bucket_download.prototype.downloadFromS3 = function download(file,localFolder, remoteFile,remoteFolderName) {

  var client = s3.createClient({
  maxAsyncS3: 20,    // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 104857600, // this is the default (100 MB)
  multipartUploadSize: 104857600, // this is the default (100 MB)
  
  s3Options: {
    accessKeyId: 'my key',
    secretAccessKey: 'my Sec key'

  },
 });
 
  
  var downloadParams = {
  localFile: localFolder+'/'+file,

  s3Params: {
    Bucket: "my bucket",
    Key: remoteFolderName+'/'+remoteFile,

  },
};
var downloader = client.downloadFile(downloadParams);
downloader.on('error', function(err) {
  console.error("unable to download:", err.stack);
});
downloader.on('progress', function() {
  console.log("progress", downloader.progressAmount, downloader.progressTotal);
});
downloader.on('end', function() {
  console.log("done downloading");
});

};