const fs = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');

const dataDir = path.resolve(__dirname, '../data');
const postComponentsToDB = () => {
  fs.readdir(dataDir, (error, components) => {
    if (error) return console.error(error);
    components.map(component => {
      const dataBuffer = fs.readFileSync(`${dataDir}/${component}`);
      const dataJSON = JSON.parse(dataBuffer);
      if (!dataJSON.id) return;
      return fetch('http://api.collab-ui.com/components', {
          method: 'POST',
          body: JSON.stringify(dataJSON),
          headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => console.log(json));
    });
  });
};

postComponentsToDB();
