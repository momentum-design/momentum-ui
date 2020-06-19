function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component list-item */
import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { ListItem, ListItemSection } from "./..";

var ListItemHeader = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(ListItemHeader, _React$PureComponent);

  function ListItemHeader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      id: _this.props.id || uniqueId('md-space-list-item__header-')
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
    var staticChildren = [/*#__PURE__*/React.createElement(ListItemSection, {
      key: "child-0",
      position: "center"
    }, /*#__PURE__*/React.createElement("div", {
      className: 'md-list-item__header'
    }, header)), /*#__PURE__*/React.createElement(ListItemSection, {
      key: "child-1",
      position: "right"
    }, children)];
    return /*#__PURE__*/React.createElement(ListItem, _extends({
      className: 'md-list-item-header' + ("" + (type && " md-list-item-header--" + type || '')) + ("" + (className && " " + className || '')),
      isReadOnly: true,
      id: id,
      title: getTitle
    }, props), staticChildren);
  };

  return ListItemHeader;
}(React.PureComponent);

ListItemHeader.propTypes = {
  /** @prop Children nodes to render inside ListItemHeader | null */
  children: PropTypes.node,

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop ListItem header text */
  header: PropTypes.string.isRequired,

  /** @prop HTML ID for associated input | '' */
  id: PropTypes.string,

  /** @prop Determines if ListItemHeader is Clickable | true */
  isReadOnly: PropTypes.bool,

  /** @prop ListItem title | '' */
  title: PropTypes.string,

  /** @prop ListItemHeader type variation | '' */
  type: PropTypes.oneOf(['', 'space', 'space-light'])
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
export default ListItemHeader;