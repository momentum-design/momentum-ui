const _ = require('lodash');

const mergeArrays = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    const combinedArrays = objValue.concat(srcValue);
    return [...new Set(combinedArrays)];
  }
};

export default mergeArrays;
