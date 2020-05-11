"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @component tabs */
var TabContent = function TabContent(props) {
  var children = props.children,
      activeIndex = props.activeIndex;

  var setPanels = _react.default.Children.map(children, function (child, idx) {
    return _react.default.cloneElement(child, {
      active: activeIndex === idx ? true : false
    });
  });

  return _react.default.createElement("div", {
    className: "md-tab__content"
  }, setPanels);
};

TabContent.propTypes = {
  /** @prop Determines the initial active index | null */
  activeIndex: _propTypes.default.number,

  /** @prop Children nodes to render inside TabContent | null */
  children: _propTypes.default.node
};
TabContent.defaultProps = {
  activeIndex: null,
  children: null
};
TabContent.displayName = 'TabContent';
var _default = TabContent;
exports.default = _default;