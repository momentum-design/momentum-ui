// eslint-disable-next-line no-undef
module.exports = {
  process() {
    return "module.exports = {};";
  },
  getCacheKey() {
    return "cssTransform";
  }
};
