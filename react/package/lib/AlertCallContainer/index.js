"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AlertCallContainer = function AlertCallContainer(props) {
  var children = props.children,
      otherProps = _objectWithoutPropertiesLoose(props, ["children"]);

  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "md-alert__container md-alert__container--call"
  }, otherProps), children);
};

AlertCallContainer.defaultProps = {
  children: null
};
AlertCallContainer.propTypes = {
  /** @prop Children Nodes to Render inside container | null */
  children: _propTypes.default.node
};
AlertCallContainer.displayName = 'AlertCallContainer';
var _default = AlertCallContainer;
exports.default = _default;