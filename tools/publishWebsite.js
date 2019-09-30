const AWS = require('aws-sdk');
const path = require('path');
const mime = require('mime');
const fs = require('fs');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
const backupDate = `${year}-${month}-${day}`;
const timeStamp = Math.round(date.getTime() / 1000);

const distPath = path.resolve(__dirname, '../www/dist');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2',
});

const getListOfFiles = async () => {
  const params = {
    Bucket: process.env.AWS_PRODUCTION_BUCKET,
  };
  try {
    const data = await s3.listObjectsV2(params).promise();
    const fileList = data.Contents.map(file => {
      return { Key: file.Key };
    });
    return fileList;
  } catch (err) {
    return console.error(err, err.stack);
  }
};

const deleteFiles = async () => {
  try {
    const fileList = await getListOfFiles();
    const params = {
      Bucket: process.env.AWS_PRODUCTION_BUCKET,
      Delete: {
        Objects: fileList,
        Quiet: false,
      },
    };
    return s3.deleteObjects(params).promise();
  } catch (err) {
    return console.error(err, err.stack);
  }
};

const copyFilesToS3 = async (bucket, directory) => {
  try {
    fs.readdirSync(distPath).forEach(fileName => {
      const filePath = path.join(distPath, fileName);
      const fileType = mime.getType(filePath);
      const fileBody = fs.readFileSync(filePath);
      const params = {
        ACL: 'public-read',
        Body: fileBody,
        ContentType: fileType,
        Bucket: bucket,
        Key: directory ? `${directory}/${fileName}` : fileName,
      };
      return s3.putObject(params).promise();
    });
  } catch (err) {
    return console.error(err, err.stack);
  }
};

const invalidateS3Cache = async () => {
  try {
    const cfParams = {
      DistributionId: process.env.AWS_PRODUCTION_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: `${timeStamp}`,
        Paths: {
          Quantity: 1,
          Items: [`/*`],
        },
      },
    };
    new AWS.CloudFront({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    })
      .createInvalidation(cfParams)
      .promise();
  } catch (err) {
    return console.error(err, err.stack);
  }
};

const publishWebsite = async () => {
  await deleteFiles();
  await copyFilesToS3(process.env.AWS_BACKUPS_BUCKET, backupDate);
  await copyFilesToS3(process.env.AWS_PRODUCTION_BUCKET);
  await invalidateS3Cache();
  console.log('momentum.design published successfully!');
};

publishWebsite();
