import React from 'react';
import kebabCase from 'lodash/kebabCase';
var SelectableContext = React.createContext();
export var makeEventKey = function makeEventKey(eventKey) {
  return kebabCase(String(eventKey));
};
export var makeKeyboardKey = function makeKeyboardKey(keyboardKey) {
  return typeof keyboardKey === 'string' && kebabCase(String(keyboardKey));
};
export default SelectableContext;