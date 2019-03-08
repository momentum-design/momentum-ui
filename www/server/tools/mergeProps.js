import config from '../config';

const mergeProps = async (existingProps, newProps) => {
  const mergedProps = {};
  try {
    for (const variation of config.VARIATIONS) {
      if (Array.isArray(existingProps[variation]) && existingProps[variation].length && (!Array.isArray(newProps[variation]) || !newProps[variation].length)) {
        mergedProps[variation] = existingProps[variation];
      } else {
        mergedProps[variation] = newProps[variation];
      }
    }
    return mergedProps;
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
};

export default mergeProps;
