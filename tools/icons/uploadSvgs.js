const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const proxy = require('proxy-agent');
const md5 = require('md5');

const getIconInfo = require('./getIconInfo');

if (process.argv.length != 3) {
  console.error("Run as uploadSvgs.js <package name>");
}

const packageName = process.argv[2];
const iconLocation = path.resolve(__dirname, `../../${packageName}/svg`);

async function uploadIcons(icons) {
  let fileList = fs.readdirSync(iconLocation);
  fileList.forEach(async (file) => {
    const iconInfo = getIconInfo(file);
    const fileName = packageName + '/' + iconInfo.variation + '/' + iconInfo.fileName;
    fileContent = fs.readFileSync(path.resolve(iconLocation, file));
    const fileMd5=md5(fileContent);
    if (!icons[fileName] || icons[fileName] !== fileMd5) {
      console.log('Uploading ' + fileName);
      console.log('Old tag ' + icons[fileName] + ' new tag ' + fileMd5);
      const s3Promise = s3.putObject({
          Bucket: AWS_S3_BUCKET,
          Key: fileName,
          Body: fileContent
        }).promise();
      try {
        await s3Promise;
        console.log(`Successfully uploaded '${fileName}'!`);
      } catch (error) {
        console.log('Upload of ' + fileName + ' gave error: ' + err + ' data: ' + data);
      }
    }
    else {
      //console.log('Already got ' + fileName);
    }
  });
}

async function getCurrentIcons(icons, continuationToken) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Prefix: packageName,
    ContinuationToken: continuationToken
  };
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error('Got error on listing objects: ' + err);
    } else {
      data.Contents.forEach((element) => {
        if (element.Key.endsWith('svg')) {
          icons[element.Key] = element.ETag.slice(1, -1);
        }
      });
      if (data.IsTruncated) {
        console.log('Need to fetch more icons! Currently got ' + Object.keys(icons).length);
        getCurrentIcons(icons, data.NextContinuationToken);
      } else {
        uploadIcons(icons);
      }
    }
  });
}

AWS.config.update({
  httpOptions: {
    agent: proxy(process.env.HTTPS_PROXY)
  }
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const icons = {};
getCurrentIcons(icons);
