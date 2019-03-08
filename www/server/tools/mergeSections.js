import config from '../config';
import get from 'lodash/get';

const mergeSections = async (existingSections, newSections) => {
  const mergedSections = [];
  try {
    for (const newSection of newSections) {
      const { name } = newSection;
      let existingSection;
      if (!existingSections) {
        return newSection;
      } else {
        existingSection = existingSections.find(newSection => {
          return newSection.name === name;
        });
      }

      const mergedVariations = {};
      for (const variation of config.VARIATIONS) {
        const existingVariation = get(get(existingSection, 'variations'), variation);
        const newVariation = get(get(newSection, 'variations'), variation);

        if (!existingVariation && !newVariation) {
          mergedVariations[variation] = {};
        } else if (existingVariation && !newVariation) {
          mergedVariations[variation] = existingVariation;
        } else {
          mergedVariations[variation] = newVariation;
        }
      }
      newSection.variations = mergedVariations;
      mergedSections.push(newSection);
    }
    return mergedSections;
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
};

export default mergeSections;
