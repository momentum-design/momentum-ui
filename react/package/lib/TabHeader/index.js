"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component tabs */
var TabHeader = function TabHeader(props) {
  var heading = props.heading,
      subHeading = props.subHeading;
  return (//Element type required by Momentum UI Style
    _react.default.createElement("md-tab-heading", null, heading, subHeading && _react.default.createElement("div", null, subHeading))
  );
};

TabHeader.propTypes = {
  /** @prop TabHeader text */
  heading: _propTypes.default.string.isRequired,

  /** @prop Subheader text | '' */
  subHeading: _propTypes.default.string
};
TabHeader.defaultProps = {
  subHeading: ''
};
TabHeader.displayName = 'TabHeader';
var _default = TabHeader;
exports.default = _default;