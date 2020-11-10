/* eslint-disable */
module.exports = {
  process() {
    return "module.exports = 'fake-file-url';";
  },
  getCacheKey() {
    return "imgTransform";
  }
};
