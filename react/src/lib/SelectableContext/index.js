import React from 'react';
import kebabCase from 'lodash/kebabCase';

const SelectableContext = React.createContext(/* () => {} */);

export const makeEventKey = eventKey => {
  return kebabCase(String(eventKey));
};

export const makeKeyboardKey = keyboardKey => {
  return kebabCase(String(keyboardKey));
};

export default SelectableContext;
