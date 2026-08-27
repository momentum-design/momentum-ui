const {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} = require('@aws-sdk/client-s3');
const { CloudFrontClient, CreateInvalidationCommand } = require('@aws-sdk/client-cloudfront');
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

const credentials = process.env.AWS_ACCESS_KEY && process.env.AWS_SECRET_ACCESS_KEY
  ? {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
  : undefined;

const s3 = new S3Client({
  credentials,
  region: 'us-west-2',
});
const cloudFront = new CloudFrontClient({ credentials, region: 'us-west-2' });

const getListOfFiles = async () => {
  try {
    const fileList = [];
    let continuationToken;
    do {
      const data = await s3.send(new ListObjectsV2Command({
        Bucket: process.env.AWS_PRODUCTION_BUCKET,
        ContinuationToken: continuationToken,
      }));
      fileList.push(...(data.Contents || []).map(file => ({ Key: file.Key })));
      continuationToken = data.IsTruncated ? data.NextContinuationToken : undefined;
    } while (continuationToken);
    return fileList;
  } catch (err) {
    return console.error(err, err.stack);
  }
};

const deleteFiles = async () => {
  try {
    const fileList = await getListOfFiles();
    if (!fileList.length) return;
    for (let index = 0; index < fileList.length; index += 1000) {
      await s3.send(new DeleteObjectsCommand({
        Bucket: process.env.AWS_PRODUCTION_BUCKET,
        Delete: {
          Objects: fileList.slice(index, index + 1000),
          Quiet: false,
        },
      }));
    }
  } catch (err) {
    return console.error(err, err.stack);
  }
};

const copyFilesToS3 = async (bucket, directory) => {
  try {
    await Promise.all(fs.readdirSync(distPath).map(fileName => {
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
      return s3.send(new PutObjectCommand(params));
    }));
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
    await cloudFront.send(new CreateInvalidationCommand(cfParams));
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
