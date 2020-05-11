"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uniqueId = _interopRequireDefault(require("lodash/uniqueId"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ListItemHeader = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(ListItemHeader, _React$PureComponent);

  function ListItemHeader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      id: _this.props.id || (0, _uniqueId.default)('md-space-list-item__header-')
    };
    return _this;
  }

  var _proto = ListItemHeader.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        header = _this$props.header,
        title = _this$props.title,
        type = _this$props.type,
        props = _objectWithoutPropertiesLoose(_this$props, ["children", "className", "header", "title", "type"]);

    var id = this.state.id;
    var getTitle = !title ? header : title;
    var staticChildren = [_react.default.createElement(_.ListItemSection, {
      key: "child-0",
      position: "center"
    }, _react.default.createElement("div", {
      className: 'md-list-item__header'
    }, header)), _react.default.createElement(_.ListItemSection, {
      key: "child-1",
      position: "right"
    }, children)];
    return _react.default.createElement(_.ListItem, _extends({
      className: 'md-list-item-header' + ("" + (type && " md-list-item-header--" + type || '')) + ("" + (className && " " + className || '')),
      isReadOnly: true,
      id: id,
      title: getTitle
    }, props), staticChildren);
  };

  return ListItemHeader;
}(_react.default.PureComponent);

ListItemHeader.propTypes = {
  /** @prop Children nodes to render inside ListItemHeader | null */
  children: _propTypes.default.node,

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop ListItem header text */
  header: _propTypes.default.string.isRequired,

  /** @prop HTML ID for associated input | '' */
  id: _propTypes.default.string,

  /** @prop Determines if ListItemHeader is Clickable | true */
  isReadOnly: _propTypes.default.bool,

  /** @prop ListItem title | '' */
  title: _propTypes.default.string,

  /** @prop ListItemHeader type variation | '' */
  type: _propTypes.default.oneOf(['', 'space'])
};
ListItemHeader.defaultProps = {
  children: null,
  className: '',
  id: '',
  isReadOnly: true,
  title: '',
  type: ''
};
ListItemHeader.displayName = 'ListItemHeader';
var _default = ListItemHeader;
exports.default = _default;