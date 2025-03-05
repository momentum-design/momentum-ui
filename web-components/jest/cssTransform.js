// eslint-disable-next-line no-undef
module.exports = {
  process(_src, _filename) {
    return {
      code: "module.exports = {};"
    };
  },
  getCacheKey() {
    return "cssTransform";
  }
};
