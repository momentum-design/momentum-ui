"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SocialList = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SocialList, _React$Component);

  function SocialList() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SocialList.prototype;

  _proto.render = function render() {
    var children = this.props.children;
    return _react.default.createElement("span", {
      className: "md-social__list"
    }, children);
  };

  return SocialList;
}(_react.default.Component);

SocialList.propTypes = {
  /** @prop Children nodes to render inside SocialList | null */
  children: _propTypes.default.node
};
SocialList.defaultProps = {
  children: null
};
SocialList.displayName = 'SocialList';
var _default = SocialList;
exports.default = _default;