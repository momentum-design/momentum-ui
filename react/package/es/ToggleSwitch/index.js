function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component toggle-switch */
import omit from 'lodash/omit';
import PropTypes from 'prop-types';
import React from 'react';

var ToggleSwitch = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(ToggleSwitch, _React$PureComponent);

  function ToggleSwitch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.state = {
      isToggleOn: _this.props.checked
    };

    _this.handleClick = function (event) {
      _this.setState({
        isToggleOn: !_this.state.isToggleOn
      });

      if (_this.props.onChange) {
        _this.props.onChange(event);
      }
    };

    return _this;
  }

  var _proto = ToggleSwitch.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        className = _this$props.className,
        disabled = _this$props.disabled,
        htmlId = _this$props.htmlId,
        label = _this$props.label,
        name = _this$props.name,
        onChange = _this$props.onChange,
        value = _this$props.value,
        props = _objectWithoutPropertiesLoose(_this$props, ["className", "disabled", "htmlId", "label", "name", "onChange", "value"]);

    var otherProps = omit(_extends({}, props), ['checked']);
    return React.createElement("div", _extends({
      className: "md-input-container md-toggle-switch" + ("" + (className && " " + className || ''))
    }, otherProps), React.createElement("input", {
      className: "md-input md-toggle-switch__input",
      type: "checkbox",
      disabled: disabled,
      "aria-checked": this.state.isToggleOn,
      checked: this.state.isToggleOn,
      name: name,
      value: value,
      id: htmlId,
      onChange: onChange,
      tabIndex: 0,
      onClick: function onClick(event) {
        return _this2.handleClick(event);
      }
    }), React.createElement("label", {
      className: "md-toggle-switch__label",
      htmlFor: htmlId
    }, React.createElement("span", {
      className: "md-toggle-switch__label__container"
    }), React.createElement("span", {
      className: "md-toggle-switch__label__text"
    }, label)));
  };

  return ToggleSwitch;
}(React.PureComponent);

ToggleSwitch.propTypes = {
  /** @prop Set the toggle switch to checked | false */
  checked: PropTypes.bool,

  /** @prop Sets the className for the toggle switch | '' */
  className: PropTypes.string,

  /** @prop Set the toggle switch to disabled | false */
  disabled: PropTypes.bool,

  /** @prop Unique HTML ID used for tying label to HTML input for automated testing */
  htmlId: PropTypes.string.isRequired,

  /** @prop Sets the label string for the toggle switch | '' */
  label: PropTypes.string.isRequired,

  /** @prop Sets the name of the toggle switch | '' */
  name: PropTypes.string,

  /** @prop Callback function invoked when state is changed | null */
  onChange: PropTypes.func,

  /** @prop Sets the value of the toggle switch | '' */
  value: PropTypes.string
};
ToggleSwitch.defaultProps = {
  checked: false,
  className: '',
  disabled: false,
  label: '',
  name: '',
  onChange: null,
  value: ''
};
ToggleSwitch.displayName = 'ToggleSwitch';
export default ToggleSwitch;