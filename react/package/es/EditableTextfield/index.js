function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component editable-textfield */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Input } from "./..";

var EditableTextfield = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(EditableTextfield, _React$Component);

  function EditableTextfield() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isEditing: false,
      inputText: _this.props.inputText
    };

    _this.componentDidUpdate = function () {
      if (_this.state.isEditing && _this.editText) {
        _this.editText.focus();
      }
    };

    _this.handleEnter = function (e, value) {
      var _this$props = _this.props,
          allowEmpty = _this$props.allowEmpty,
          handleDoneEditing = _this$props.handleDoneEditing;
      e.persist();

      if (!allowEmpty && (!value || !value.replace(/\s/g, ''))) {
        _this.setState({
          isEditing: false
        }, function () {
          return handleDoneEditing && handleDoneEditing(e, {
            value: value
          });
        });
      } else {
        _this.setState({
          isEditing: false,
          inputText: value
        }, function () {
          return handleDoneEditing && handleDoneEditing(e, {
            value: value
          });
        });
      }

      e.nativeEvent.stopImmediatePropagation();
    };

    _this.handleBlur = function (e, value) {
      var _this$props2 = _this.props,
          allowEmpty = _this$props2.allowEmpty,
          handleDoneEditing = _this$props2.handleDoneEditing;
      e.persist();

      if (!allowEmpty && (!value || !value.replace(/\s/g, ''))) {
        _this.setState({
          isEditing: false
        }, function () {
          return handleDoneEditing && handleDoneEditing(e, {
            value: value
          });
        });
      } else {
        _this.setState({
          isEditing: false,
          inputText: value
        }, function () {
          return handleDoneEditing && handleDoneEditing(e, {
            value: value
          });
        });
      }
    };

    _this.handleEsc = function (e) {
      _this.setState({
        isEditing: false
      });

      e.nativeEvent.stopImmediatePropagation();
    };

    _this.handleClick = function () {
      var disabled = _this.props.disabled;

      if (disabled) {
        return;
      } else {
        _this.setState({
          isEditing: true
        });
      }
    };

    _this.handleKey = function () {
      var disabled = _this.props.disabled;

      if (disabled) {
        return;
      } else {
        _this.setState({
          isEditing: true
        });
      }
    };

    _this.handleDoneKeyDown = function (e) {
      if (e.keyCode === 27) {
        _this.handleEsc(e);
      } else if (e.keyCode === 13) {
        _this.handleEnter(e, e.target.value);
      }
    };

    return _this;
  }

  var _proto = EditableTextfield.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        alignment = _this$props3.alignment,
        buttonClassName = _this$props3.buttonClassName,
        buttonProps = _this$props3.buttonProps,
        className = _this$props3.className,
        props = _objectWithoutPropertiesLoose(_this$props3, ["alignment", "buttonClassName", "buttonProps", "className"]);

    var _this$state = this.state,
        isEditing = _this$state.isEditing,
        inputText = _this$state.inputText;
    var inputProps = omit(_extends({}, props), ['allowEmpty', 'disabled', 'handleDoneEditing', 'inputText']);
    return React.createElement("span", {
      className: 'md-editable-textfield' + ("" + (alignment && " md-editable-textfield--" + alignment || ''))
    }, isEditing && React.createElement(Input, _extends({
      className: 'md-editable-textfield__editing' + ("" + (className && " " + className || '')),
      inputRef: function inputRef(input) {
        _this2.editText = input;
      },
      onDoneEditing: this.handleBlur,
      onKeyDown: this.handleDoneKeyDown,
      value: inputText
    }, inputProps)), !isEditing && React.createElement("div", _extends({
      role: "button",
      tabIndex: 0,
      className: 'md-editable-textfield__button' + ("" + (buttonClassName && " " + buttonClassName || '')),
      onClick: this.handleClick,
      onKeyPress: this.handleKey
    }, buttonProps), inputText || "\xA0"));
  };

  return EditableTextfield;
}(React.Component);

EditableTextfield.displayName = 'EditableTextfield';
EditableTextfield.propTypes = {
  /** @prop Alignment css modifier | 'left' */
  alignment: PropTypes.oneOf(['center', 'left', 'right']),

  /** @prop Optional prop that prevents input from having null value | true */
  allowEmpty: PropTypes.bool,

  /** @prop Optional css class name for internal button | null */
  buttonClassName: PropTypes.string,

  /** @prop Optional props for internal button | '' */
  buttonProps: PropTypes.shape({}),

  /** @prop Optional css class string | '' */
  className: PropTypes.string,

  /** @prop Sets the disable attribute for EditableTextField | false */
  disabled: PropTypes.bool,

  /** @prop Optional function for blur | null */
  handleDoneEditing: PropTypes.func,

  /** @prop Text to be shown within input field | null */
  inputText: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
EditableTextfield.defaultProps = {
  alignment: 'left',
  allowEmpty: true,
  buttonClassName: '',
  buttonProps: null,
  className: '',
  disabled: false,
  handleDoneEditing: null,
  inputText: ''
};
export default EditableTextfield;