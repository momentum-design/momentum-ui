module.exports = {
  test(value) {
    return Boolean(
      value &&
      value.constructor &&
      /Wrapper$/.test(value.constructor.name) &&
      typeof value.debug === 'function'
    );
  },
  serialize(value) {
    return value.debug().replace(/[ \t]+$/gm, '');
  },
};
