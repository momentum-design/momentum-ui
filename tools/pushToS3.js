const AWS = require('aws-sdk');
const path = require('path');
const mime = require('mime');
const fs = require('fs-extra');
const argv = require('yargs').argv;

const { library } = argv;
const packageJSON =
  library === 'angular'
    ? require(path.resolve(__dirname, `../${library}/dist/@momentum-ui/angular/package.json`))
    : require(path.resolve(__dirname, `../${library}/package.json`));
const config = require(path.resolve(__dirname, `../${library}/tools/config`));
const objectsList = config.CDN_OBJECTS;
const libraryDir = path.resolve(__dirname, `../${library}`);
const version = packageJSON.version;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2',
});

const copyFilesToS3 = async (bucket, version) => {
  try {
    const promises = [];
    const files = await getFileList(libraryDir, objectsList);
    for (let file of files) {
      if (!file.relPath.includes('.DS_Store')) promises.push(putObjectToS3(file, bucket, version));
    }
    Promise.all(promises).then(() =>
      console.log(`${library} ${version ? version + ' ' : ''}files copied to S3 successfully!`)
    );
  } catch (err) {
    return console.error(err, err.stack);
  }
};

const getFileList = async (dir, list) => {
  let fileList = [];
  for (let item of list) {
    const itemPath = path.resolve(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const subList = await walkDir(item, itemPath, fileList);
      fileList.concat(subList);
    } else {
      fileList.push({
        absPath: itemPath,
        relPath: itemPath.replace(`${libraryDir}/`, ''),
      });
    }
  }
  return fileList;
};

const walkDir = async (dirName, dirPath, walkList = []) => {
  const files = fs.readdirSync(dirPath);
  for (let file of files) {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      walkList = await walkDir(dirName, filePath, walkList);
    } else {
      walkList.push({
        absPath: filePath,
        relPath: filePath.replace(`${libraryDir}/`, '').replace(`dist/@momentum-ui/angular/`, ''),
      });
    }
  }
  return walkList;
};

const putObjectToS3 = async (file, bucket, version) => {
  const fileType = mime.getType(file.absPath);
  const fileBody = fs.readFileSync(file.absPath);
  const params = {
    ACL: 'public-read',
    Body: fileBody,
    ContentType: fileType,
    Bucket: bucket,
    Key: version
      ? `@momentum-ui/${library}/${version}/${file.relPath}`
      : `@momentum-ui/${library}/${file.relPath}`,
  };
  return s3.putObject(params).promise();
};

const pushToS3 = async () => {
  console.log(`Starting to copy ${library} files to AWS S3...`);
  await copyFilesToS3(process.env.AWS_DOWNLOADS_BUCKET, version);
  await copyFilesToS3(process.env.AWS_DOWNLOADS_BUCKET);
};

pushToS3();
