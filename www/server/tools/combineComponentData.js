import prepareWpSectionsData from './prepareWpSectionsData';
import prepareCodeSectionsData from './prepareCodeSectionsData';

const combineComponentData = async (wpComponent, codeComponent) => {
  try {
    const { id, name, displayName, description, mainImage, thumbnailImage, content, parent, path, designSections, usageSections, homeSections, children } = wpComponent;

    const style = await prepareWpSectionsData(designSections, name);
    const usage = await prepareWpSectionsData(usageSections, name);
    const code = await prepareCodeSectionsData(codeComponent);

    const combineComponent = {
      id,
      name,
      displayName,
      description,
      mainImage,
      thumbnailImage,
      content,
      parent,
      path,
      style,
      usage,
      code,
      homeSections,
      children,
    };
    return combineComponent;
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
};

export default combineComponentData;
