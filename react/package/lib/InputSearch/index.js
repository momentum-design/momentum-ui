"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SearchInput = function SearchInput(props) {
  var isLoading = props.isLoading,
      otherProps = _objectWithoutPropertiesLoose(props, ["isLoading"]);

  return /*#__PURE__*/_react.default.createElement(_.Input, _extends({
    inputBefore: isLoading ? /*#__PURE__*/_react.default.createElement(_.Spinner, {
      size: 20
    }) : /*#__PURE__*/_react.default.createElement(_.Icon, {
      name: "search_20"
    })
  }, otherProps));
};

SearchInput.propTypes = {
  /** @prop Determines if spinner is present | false */
  isLoading: _propTypes.default.bool
};
SearchInput.defaultProps = {
  isLoading: false
};
SearchInput.displayName = 'SearchInput';
var _default = SearchInput;
exports.default = _default;