function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/** @component list-separator */
import React from 'react';
import PropTypes from 'prop-types';
import { prefix } from "../utils/index";

var ListSeparator = function ListSeparator(props) {
  var children = props.children,
      className = props.className,
      lineColor = props.lineColor,
      margin = props.margin,
      textColor = props.textColor,
      text = props.text,
      textPadding = props.textPadding,
      otherProps = _objectWithoutPropertiesLoose(props, ["children", "className", "lineColor", "margin", "textColor", "text", "textPadding"]);

  var lsClass = prefix + "-list-separator";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "" + lsClass + ("" + (className && " " + className || '')),
    style: _extends({}, lineColor && {
      color: lineColor
    }, margin && {
      margin: margin
    })
  }, otherProps), /*#__PURE__*/React.createElement("span", {
    className: lsClass + "__container"
  }, children || text && /*#__PURE__*/React.createElement("span", {
    className: lsClass + "__text",
    style: _extends({}, textColor && {
      color: textColor
    }, textPadding && {
      padding: textPadding
    })
  }, children ? children : text)));
};

ListSeparator.propTypes = {
  /** @prop Children nodes to render inside ListSeparator | null */
  children: PropTypes.node,

  /** @prop Optional css class name | null */
  className: PropTypes.string,

  /** @prop Color of the ListSeparator line | null */
  lineColor: PropTypes.string,

  /** @prop Margin of the ListSeparator | null */
  margin: PropTypes.string,

  /** @prop Text of the ListSeparator | null */
  text: PropTypes.string,

  /** @prop TextColor of the ListSeparator | null */
  textColor: PropTypes.string,

  /** @prop Padding around text of the ListSeparator | null */
  textPadding: PropTypes.string
};
ListSeparator.defaultProps = {
  children: null,
  className: null,
  lineColor: null,
  margin: null,
  text: null,
  textColor: null,
  textPadding: null
};
ListSeparator.displayName = 'ListSeparator';
export default ListSeparator;