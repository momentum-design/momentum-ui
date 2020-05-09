"use strict";

exports.__esModule = true;
exports.default = exports.makeKeyboardKey = exports.makeEventKey = void 0;

var _react = _interopRequireDefault(require("react"));

var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectableContext = _react.default.createContext();

var makeEventKey = function makeEventKey(eventKey) {
  return (0, _kebabCase.default)(String(eventKey));
};

exports.makeEventKey = makeEventKey;

var makeKeyboardKey = function makeKeyboardKey(keyboardKey) {
  return typeof keyboardKey === 'string' && (0, _kebabCase.default)(String(keyboardKey));
};

exports.makeKeyboardKey = makeKeyboardKey;
var _default = SelectableContext;
exports.default = _default;