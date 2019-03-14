import config from '../config';
import https from 'https';
import fs from 'fs';
import path from 'path';

const PATH_MD = path.resolve(__dirname,'../changeLog/md');

const save = (path,fileName,data)=> {
  fs.writeFile(path+'/'+fileName,data,{
    encoding:'utf8',
    mode:0o666,
    flag:'w'
  },function(err){
    if (err) throw err;
  });
};

const downloadFile = (fileName,callback) => {
  let url = config.CHANGE_LOG_URLS[fileName],
    md='';
  if(url){
    https.get(url, function (response) {
      response.setEncoding('binary');
      response.on('data', function (data) {
        md += data;
      }).on('end', function(){
        save(PATH_MD,fileName+'.md',md);
        callback && callback({
          md
        });
      });
    });
  }
};

const readFromDisc = (fileName) => {
  let md = fs.readFileSync(PATH_MD+'/'+fileName+'.md','utf8');
  return {
    md
  };
};

export default {
  save,
  downloadFile,
  readFromDisc
};