import https from 'https';
import fileSave from 'file-save';
import path from 'path';
import { kebabCase } from 'lodash';

const GITHUB_CONTENT_URL = process.env.GITHUB_CONTENT_URL || 'https://raw.githubusercontent.com/momentum-design';

const COMPONENT_LIST_URLS = {
  'core':`${GITHUB_CONTENT_URL}/momentum-ui/master/core/data/components.json`,
  'react':`${GITHUB_CONTENT_URL}/momentum-ui/master/react/src/app/ComponentList.js`,
  'angular':`${GITHUB_CONTENT_URL}/momentum-ui/master/angular/src/lib/public_api.ts`,
  'vue':`${GITHUB_CONTENT_URL}/momentum-ui/master/vue/components.json`
};


const PATH_JSON = path.resolve(__dirname, '../client/data');

const save = (filePath, fileName, data) => {
  fileSave(path.join(filePath, fileName))
    .write(data, 'utf8')
    .end('\n');
  // eslint-disable-next-line no-console
  console.log(`Component list saved to ${filePath}/${fileName}`);
};

const getReactComponentList = str => {
  let res = str.match(/'(.+?)'/g);
  return res.map(function(item){
    return kebabCase(item.replace(/'/g, ''));
  });
};

const getAngularComponentList = str => {
  let res = str.match(/'\.\/(.+?)\//g);
  return res.map(function(item){
    return item.replace(/'\.\/|\//g, '');
  });
};

const downloadFile = (fileName) => {
  let url = COMPONENT_LIST_URLS[fileName];
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

        save(PATH_JSON, 'component-list-' + fileName + '.json', listStr);
      });
    });
  }
};

try {
  for(let name in COMPONENT_LIST_URLS){
    downloadFile(name);
  }
} catch (err) {
  // eslint-disable-next-line no-console
  console.log(err);
}