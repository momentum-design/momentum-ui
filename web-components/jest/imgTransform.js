// eslint-disable-next-line no-undef
module.exports = {
  process(_src, _filename) {
    return {
      code: "module.exports = 'fake-file-url';"
    };
  },
  getCacheKey() {
    return "imgTransform";
  }
};
