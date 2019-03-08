import Component from '../models/component';
import mergeProps from './mergeProps';
import mergeSections from './mergeSections';

const addOrUpdateComponent = async component => {
  try {
    const query = { id: component.id };
    const existingComponent = await Component.findOne(query);
    if (existingComponent) {
      const newComponent = {};
      newComponent.props = await mergeProps(existingComponent.props, component.props);
      newComponent.sections = await mergeSections(existingComponent.sections, component.sections);
      const updatedComponent = await Component.findByIdAndUpdate(existingComponent._id, newComponent, { new: true });
      return updatedComponent;
    } else {
      const response = await Component.findOrCreate(component);
      return response;
    }
  } catch (error) {
    console.error(error.message); // eslint-disable-line no-console
  }
};

export default addOrUpdateComponent;
