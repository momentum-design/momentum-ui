const findIndex = require('lodash/findIndex');
const set = require('lodash/set');
const get = require('lodash/get');
const remove = require('lodash/remove');
const isEmpty = require('lodash/isEmpty');

let dataJSON = [];

const getComponentIndex = name => {
  return findIndex(dataJSON, { name });
};

const getComponentID = (baseJSON, name) => {
  const componentIndex = findIndex(baseJSON, { name });
  if (componentIndex < 0) return;
  return baseJSON[componentIndex].id;
};

const addOrUpdateComponent = async (block, index) => {
  try {
    if (index < 0) {
      const newComponent = {
        name: block.component,
        id: block.id,
        description: block.description,
        sections: [],
        props: {},
      };
      dataJSON = [newComponent, ...dataJSON];
    } else {
      const updatedComponent = dataJSON[index];
      set(updatedComponent, 'name', block.component);
      set(updatedComponent, 'description', block.description);
      dataJSON[index] = updatedComponent;
    }
  } catch (error) {
    throw new Error(
      console.error(
        `Error in addOrUpdateComponent with ${block.component}`,
        error
      )
    );
  }
};

const getSectionIndex = (name, componentIndex) => {
  const componentSections = get(dataJSON[componentIndex], 'sections');
  return findIndex(componentSections, { name });
};

const verifySection = async (block, componentName) => {
  try {
    if (!block.section) return dataJSON;
    const componentIndex = await getComponentIndex(componentName);
    const sectionIndex = await getSectionIndex(block.section, componentIndex);
    await addOrUpdateSection(block, componentIndex, sectionIndex);
  } catch (error) {
    throw new Error(
      console.error(
        `Error in verifySection with ${block.component} ${block.section}`,
        error
      )
    );
  }
};

const addOrUpdateSection = async (block, componentIndex, sectionIndex) => {
  try {
    const section =
      sectionIndex > -1
        ? dataJSON[componentIndex].sections[sectionIndex]
        : {
            name: block.section,
            variations: {},
          };
    if (!section.variations) section.variations = {};
    section.variations.core = block.core ? block.core : section.variations.core;
    section.variations.react = block.js
      ? block.js
      : block.react
      ? block.react
      : section.variations.react;
    section.variations.scss = block.scss ? block.scss : section.variations.scss;
    section.hidecode = block.hidecode ? block.hidecode : section.hidecode;

    if (sectionIndex > -1) {
      return (dataJSON[componentIndex].sections[sectionIndex] = section);
    } else {
      return dataJSON[componentIndex].sections.push(section);
    }
  } catch (error) {
    throw new Error(
      console.error(
        `Error in addOrUpdateSection with ${block.component} ${block.section}`,
        error
      )
    );
  }
};

const getPropIndex = (props, name) => {
  return findIndex(props, { name });
};

const verifyProps = async (block, componentName) => {
  try {
    if (!block.prop) return dataJSON;
    const componentIndex = await getComponentIndex(componentName);
    addOrUpdateProps(block, componentIndex);
  } catch (error) {
    throw new Error(
      console.error(
        `Error in verifyProps with ${componentName} ${block.section}`,
        error
      )
    );
  }
};

const addOrUpdateProps = async (block, componentIndex) => {
  try {
    const prop = {
      name: block.prop.name,
      type: block.prop.type,
      description: block.prop.description,
      default: block.prop.default,
      required: block.prop.required,
    };
    if (!dataJSON[componentIndex].props) dataJSON[componentIndex].props = {};
    const propLibrary = block.prop.library;
    const existingProps = dataJSON[componentIndex].props[propLibrary];
    const propIndex = getPropIndex(existingProps, prop.name);
    if (!existingProps)
      return (dataJSON[componentIndex].props[propLibrary] = [prop]);
    else if (propIndex < 0)
      return dataJSON[componentIndex].props[propLibrary].push(prop);
    console.info(
      `Replacing existing prop ${prop.name} in ${propLibrary} props of ${
        dataJSON[componentIndex].name
      } component.`
    );
    return (dataJSON[componentIndex].props[propLibrary][propIndex] = prop);
  } catch (error) {
    throw new Error(
      console.error(
        `Error in addOrUpdateProps with ${block.component} ${block.prop.name}`,
        error
      )
    );
  }
};

const removeEmptyComponents = async dataJSON => {
  return remove(
    dataJSON,
    component => isEmpty(component.sections) && isEmpty(component.props)
  );
};

const dataToJSON = async (baseJSON, blocksArray) => {
  dataJSON = baseJSON;
  try {
    for (let blocks of blocksArray) {
      if (blocks[0].component) {
        for (let block of blocks) {
          const componentName = blocks[0].component;
          const componentID = await getComponentID(baseJSON, componentName);
          const newBlock = {
            component: componentName,
            id: componentID,
            ...block,
          };

          await addOrUpdateComponent(
            newBlock,
            getComponentIndex(componentName)
          );
          await verifySection(newBlock, componentName);
          await verifyProps(newBlock, componentName);
        }
      }
    }
    await removeEmptyComponents(dataJSON);
    return dataJSON;
  } catch (error) {
    throw new Error(
      console.error(`Error in dataToJSON with ${dataJSON.component}`, error)
    );
  }
};

module.exports = dataToJSON;
