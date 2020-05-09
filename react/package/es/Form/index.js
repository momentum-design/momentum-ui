function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component form */
import React from 'react';
import PropTypes from 'prop-types';

var Form = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Form, _React$PureComponent);

  function Form() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = Form.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        name = _this$props.name,
        children = _this$props.children,
        props = _objectWithoutPropertiesLoose(_this$props, ["name", "children"]);

    return React.createElement("form", _extends({
      name: name,
      className: "md-form"
    }, props), children);
  };

  return Form;
}(React.PureComponent);

Form.propTypes = {
  /** @prop Children node to render inside Form | null */
  children: PropTypes.node,

  /** @prop Form name */
  name: PropTypes.string.isRequired
};
Form.defaultProps = {
  children: null
};
Form.displayName = 'Form';
export default Form;