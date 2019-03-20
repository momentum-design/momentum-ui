const flattenAcfSection = async section => {
  try {
    const flatSection = {};
    for (const block of section) {
      for (const prop in block) {
        if (prop !== 'acf_fc_layout') {
          flatSection[prop] = block[prop];
        }
      }
    }
    return flatSection;
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
};

export default flattenAcfSection;
