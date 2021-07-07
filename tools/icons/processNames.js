const _ = require('lodash');

const processNames = (name, ext) => {
  const names = {};
  const nameSplit =
    name.indexOf('@') !== -1 ? _.split(name, '@') : _.split(name, '*');
  const variationInfo = _.split(nameSplit[0], '_');

  names.variation = nameSplit[0];
  names.format = (nameSplit[1] || '') + ext;
  names.baseName = variationInfo[0];
  names.size = variationInfo[1];
  names.color = variationInfo[2] || 'default';
  return names;
};

module.exports = processNames;
