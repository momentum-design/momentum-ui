const fs = require('fs');
const path = require('path');
const { ListObjectsV2Command, PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { NodeHttpHandler } = require('@smithy/node-http-handler');
const { HttpsProxyAgent } = require('https-proxy-agent');
const md5 = require('md5');

const getIconInfo = require('./getIconInfo');

if (process.argv.length != 3) {
  console.error("Run as uploadSvgs.js <package name>");
}

const packageName = process.argv[2];
const iconLocation = path.resolve(__dirname, `../../${packageName}/svg`);

async function uploadIcons(icons) {
  const fileList = fs.readdirSync(iconLocation);
  await Promise.all(fileList.map(async (file) => {
    const iconInfo = getIconInfo(file);
    const fileName = packageName + '/' + iconInfo.variation + '/' + iconInfo.fileName;
    const fileContent = fs.readFileSync(path.resolve(iconLocation, file));
    const fileMd5=md5(fileContent);
    if (!icons[fileName] || icons[fileName] !== fileMd5) {
      console.log('Uploading ' + fileName);
      console.log('Old tag ' + icons[fileName] + ' new tag ' + fileMd5);
      const s3Promise = s3.send(new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: fileName,
          Body: fileContent
        }));
      try {
        await s3Promise;
        console.log(`Successfully uploaded '${fileName}'!`);
      } catch (error) {
        console.log('Upload of ' + fileName + ' gave error: ' + error);
      }
    }
    else {
      //console.log('Already got ' + fileName);
    }
  }));
}

async function getCurrentIcons(icons) {
  let continuationToken;
  do {
    const data = await s3.send(new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET,
      Prefix: packageName,
      ContinuationToken: continuationToken
    }));
    for (const element of data.Contents || []) {
      if (element.Key.endsWith('svg')) {
        icons[element.Key] = element.ETag.slice(1, -1);
      }
    }
    continuationToken = data.IsTruncated ? data.NextContinuationToken : undefined;
    if (continuationToken) {
      console.log('Need to fetch more icons! Currently got ' + Object.keys(icons).length);
    }
  } while (continuationToken);

  await uploadIcons(icons);
}

const requestHandler = process.env.HTTPS_PROXY
  ? new NodeHttpHandler({ httpsAgent: new HttpsProxyAgent(process.env.HTTPS_PROXY) })
  : undefined;
const s3 = new S3Client({ requestHandler });

const icons = {};
getCurrentIcons(icons).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
