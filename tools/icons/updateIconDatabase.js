const fs = require('fs');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');

const getIconInfo = require('./getIconInfo');

const iconsUrl = process.env.ICONS_API_URL || 'http://api.momentum-ui.com/icons';

if (process.argv.length != 3) {
  console.error("Run as updateIconDatabase.js <package name>");
}

const packageName = process.argv[2];
const iconLocation = path.resolve(__dirname, `../../${packageName}/svg`);

function generateIconData() {
  const icons = {}

  let fileList = fs.readdirSync(iconLocation);
  fileList.forEach((file) => {
    const iconInfo = getIconInfo(file);
    if (!iconInfo.color || !iconInfo.size || !iconInfo.baseName) {
      console.error('Bad icon filename ' + file);
    } else {
      if (!(iconInfo.baseName in icons)) {
        icons[iconInfo.baseName] = {name: iconInfo.baseName, colors: {}, sizes: {}};
      }
      if (!icons[iconInfo.baseName].colors[iconInfo.color]) {
        icons[iconInfo.baseName].colors[iconInfo.color] = [];
      }
      icons[iconInfo.baseName].colors[iconInfo.color].push(iconInfo.size);
      if (!icons[iconInfo.baseName].sizes[iconInfo.size]) {
        icons[iconInfo.baseName].sizes[iconInfo.size] = [];
      }
      icons[iconInfo.baseName].sizes[iconInfo.size].push(iconInfo.color);
    }
  });

  return icons;
}

async function getCurrentIconData() {
  const currentIcons = await axios.get(iconsUrl);

  const mungedIcons = {};
  currentIcons.data.forEach((icon) => {
    mungedIcons[icon.name] = {name: icon.name, colors: icon.colors, sizes: icon.sizes};
  });

  return mungedIcons;
}

async function uploadIcon(icon) {
  try {
    const updatedIcon = await axios.post(iconsUrl, icon);
    console.log(`${updatedIcon.data.name} updated in the database!`);
  } catch (error) {
    console.error(`Error adding icon to the database. ${error.message}`);
  }
}

async function updateDatabase() {
  const newIcons = generateIconData();
  const currentIcons = await getCurrentIconData();

  Object.values(newIcons).forEach(async (icon) => {
    let doUpload = false;
    if (icon.name in currentIcons) {
      const currentIcon = currentIcons[icon.name];
      if (!_.isEqual(icon.colors.default.sort(), currentIcon.colors.default.sort())) {
        doUpload = true;
        console.log('Icon ' + icon.name + ' changed data');
        //console.log(icon.colors.default);
        //console.log(currentIcon.colors.default);
      }
    } else {
      console.log('Icon ' + icon.name + ' new icon');
      doUpload = true;
    }
    if (doUpload) {
      uploadIcon(icon);
    }
  });
}

updateDatabase();
