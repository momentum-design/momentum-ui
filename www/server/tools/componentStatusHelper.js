import config from '../config';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { kebabCase } from 'lodash';

const PATH_JSON = path.resolve(__dirname, '../componentStatus');

const save = (path, fileName,data) => {
  fs.writeFile(path + '/' + fileName,data,{
    encoding:'utf8',
    mode:0o666,
    flag:'w'
  }, function(err) {
    if (err) throw err;
  });
};

const getReactComponentList = str => {
  let res = str.match(/\'(.+?)\'/g);
  return res.map(function(item){
    return kebabCase(item.replace(/'/g, ''));
  });
};

const getAngularComponentList = str => {
  let res = str.match(/\'\.\/(.+?)\//g);
  return res.map(function(item){
    return item.replace(/'\.\/|\//g, '');
  });
};

const downloadFile = (fileName, callback) => {
  let url = config.COMPONENT_LIST_URLS[fileName];
  let result = '';
  if (url) {
    https.get(url, function (response) {
      response.setEncoding('binary');
      response.on('data', function (data) {
        result += data;
      }).on('end', function(){
        let listStr = result;
        if (fileName === 'core') {
          const lst = JSON.parse(result);
          let names = [];
          lst.map(function(item){
            names.push(item.name);
          });
          listStr = JSON.stringify(names);
        } else if (fileName === 'react') {
          const res = getReactComponentList(result);
          listStr = JSON.stringify(res);
        } else if (fileName === 'angular') {
          const res = getAngularComponentList(result);
          listStr = JSON.stringify(res);
        } else if (fileName === 'vue') {
          const lst = JSON.parse(result);
          let names = Object.keys(lst);
          listStr = JSON.stringify(names);
        }

        save(PATH_JSON, fileName + '.json', listStr);
        callback && callback({
          json
        });
      });
    });
  }
};

const readFromDisc = fileName => {
  let json = fs.readFileSync(PATH_JSON + '/' + fileName + '.json', 'utf8');
  return json;
};

export default {
  save,
  downloadFile,
  readFromDisc
};