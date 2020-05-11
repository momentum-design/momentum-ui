function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/** @component input */
import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import toLower from 'lodash/toLower';
import { Icon, InputHelper, InputMessage, InputSection, Label } from "./..";

var determineMessageType = function determineMessageType(array) {
  return array.reduce(function (agg, e) {
    return agg === 'error' ? agg : e.type || '';
  }, '');
};

var filterMessagesByType = function filterMessagesByType(array, value) {
  return array.reduce(function (agg, e) {
    return e.type === value ? agg.concat(e.message) : agg;
  }, []);
};
/** Text input with integrated label to enforce consistency in layout, error display, label placement, and required field marker. */


var Input = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Input, _React$Component);

  function Input() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      isEditing: false,
      value: _this.props.value || _this.props.defaultValue
    };

    _this.setValue = function (value) {
      _this.setState({
        value: value
      });
    };

    _this.handleKeyDown = function (e) {
      var onKeyDown = _this.props.onKeyDown;
      onKeyDown && onKeyDown(e);
    };

    _this.handleFocus = function (e) {
      var _this$props = _this.props,
          onFocus = _this$props.onFocus,
          disabled = _this$props.disabled;

      if (disabled) {
        e.stopPropagation();
        return;
      }

      if (onFocus) {
        onFocus(e);
      }

      _this.setState({
        isEditing: true
      });
    };

    _this.handleMouseDown = function (e) {
      var _this$props2 = _this.props,
          onMouseDown = _this$props2.onMouseDown,
          disabled = _this$props2.disabled;

      if (disabled) {
        e.stopPropagation();
        return;
      }

      if (onMouseDown) {
        onMouseDown(e);
      }

      _this.setState({
        isEditing: true
      });
    };

    _this.handleChange = function (e) {
      var onChange = _this.props.onChange;
      var value = e.target.value;
      e.persist();

      _this.setState(function () {
        onChange && onChange(e);
        return {
          value: value
        };
      });
    };

    _this.handleBlur = function (e) {
      var onDoneEditing = _this.props.onDoneEditing;
      var value = e.target.value;

      if (e.which === 27 || e.which === 13 || e.type === 'blur') {
        _this.setState({
          isEditing: false
        }, function () {
          return onDoneEditing && onDoneEditing(e, value);
        });
      }

      e.stopPropagation();
    };

    _this.handleClear = function (e) {
      var value = '';
      e.target.value = value;
      e.persist();

      _this.input.focus();

      _this.handleChange(e);
    };

    _this.setInputRef = function (input) {
      var _this$props3 = _this.props,
          clear = _this$props3.clear,
          inputRef = _this$props3.inputRef;
      if (clear) _this.input = input;
      if (inputRef) return inputRef(input);
    };

    return _this;
  }

  var _proto = Input.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var value = this.props.value;
    value !== prevProps.value && this.setValue(value);
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        ariaDescribedBy = _this$props4.ariaDescribedBy,
        ariaLabel = _this$props4.ariaLabel,
        className = _this$props4.className,
        clear = _this$props4.clear,
        clearAriaLabel = _this$props4.clearAriaLabel,
        containerSize = _this$props4.containerSize,
        disabled = _this$props4.disabled,
        messageArr = _this$props4.messageArr,
        htmlId = _this$props4.htmlId,
        id = _this$props4.id,
        inputClassName = _this$props4.inputClassName,
        helpText = _this$props4.helpText,
        inputSize = _this$props4.inputSize,
        isFilled = _this$props4.isFilled,
        label = _this$props4.label,
        multiline = _this$props4.multiline,
        nestedLevel = _this$props4.nestedLevel,
        placeholder = _this$props4.placeholder,
        readOnly = _this$props4.readOnly,
        secondaryLabel = _this$props4.secondaryLabel,
        shape = _this$props4.shape,
        type = _this$props4.type,
        props = _objectWithoutPropertiesLoose(_this$props4, ["ariaDescribedBy", "ariaLabel", "className", "clear", "clearAriaLabel", "containerSize", "disabled", "messageArr", "htmlId", "id", "inputClassName", "helpText", "inputSize", "isFilled", "label", "multiline", "nestedLevel", "placeholder", "readOnly", "secondaryLabel", "shape", "type"]);

    var _this$state = this.state,
        isEditing = _this$state.isEditing,
        value = _this$state.value;
    var otherProps = omit(_extends({}, props), ['defaultValue', 'inputAfter', 'inputBefore', 'inputRef', 'onChange', 'onDoneEditing', 'onFocus', 'onKeyDown', 'onMouseDown', 'ref', 'value']);
    var messageType = messageArr.length > 0 && determineMessageType(messageArr) || '';
    var messages = messageType && filterMessagesByType(messageArr, messageType) || null;
    var clearButton = clear && !disabled && value && React.createElement(InputSection, {
      position: "after"
    }, React.createElement(Icon, {
      name: "clear-active_16",
      onClick: this.handleClear,
      ariaLabel: clearAriaLabel || 'clear input',
      buttonClassName: "md-input__icon-clear"
    }));

    var inputSection = function inputSection(position) {
      return _this2.props["input" + position] && React.createElement(InputSection, {
        position: toLower(position)
      }, _this2.props["input" + position]);
    };

    var inputLeft = inputSection('Before');
    var inputRight = clearButton || inputSection('After');
    var InputTag = multiline ? 'textarea' : 'input';
    var inputElement = React.createElement("div", {
      className: 'md-input__wrapper' + ("" + (inputSize ? " columns " + inputSize : ''))
    }, inputLeft, React.createElement(InputTag, _extends({
      className: 'md-input' + ("" + (multiline ? ' md-input--multiline' : '')) + ("" + (shape ? " md-input--" + shape : '')) + ("" + (inputLeft ? " md-input--before" : '')) + ("" + (inputRight ? " md-input--after" : '')) + ("" + (isEditing ? " md-active" : '')) + ("" + (inputClassName ? " " + inputClassName : '')) + ("" + (readOnly ? ' md-read-only' : '')) + ("" + (disabled ? ' md-disabled' : '')) + ("" + (value ? " md-dirty" : '')),
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onMouseDown: this.handleMouseDown,
      ref: this.setInputRef,
      tabIndex: 0,
      type: type,
      value: value
    }, ariaDescribedBy && {
      'aria-describedby': ariaDescribedBy
    }, ariaLabel && {
      'aria-label': ariaLabel
    }, disabled && {
      disabled: disabled
    }, (htmlId || id) && {
      id: htmlId || id
    }, otherProps, placeholder && {
      placeholder: placeholder
    }, readOnly && {
      readOnly: readOnly
    })), inputRight);
    return React.createElement("div", {
      className: "md-input-container" + ("" + (isFilled ? ' md-input--filled' : '')) + ("" + (containerSize ? " columns " + containerSize : '')) + ("" + (readOnly ? ' md-read-only' : '')) + ("" + (disabled ? ' md-disabled' : '')) + ("" + (messageType ? " md-" + messageType : '')) + ("" + (nestedLevel && " md-input--nested-" + nestedLevel || '')) + ("" + (className ? " " + className : ''))
    }, label && React.createElement(Label, {
      className: "md-input__label",
      htmlFor: htmlId || id,
      label: label
    }), inputElement, secondaryLabel && React.createElement(Label, {
      className: "md-input__secondary-label",
      htmlFor: htmlId || id,
      label: secondaryLabel
    }), helpText && React.createElement(InputHelper, {
      message: helpText
    }), messages && React.createElement("div", {
      className: "md-input__messages"
    }, messages.map(function (m, i) {
      return React.createElement(InputMessage, {
        message: m,
        key: "input-message-" + i
      });
    })));
  };

  return Input;
}(React.Component);

Input.propTypes = {
  /** @prop ID to reference for blindness accessibility feature | null */
  ariaDescribedBy: PropTypes.string,

  /** @prop Text to display for blindness accessibility features | null */
  ariaLabel: PropTypes.string,

  /** @prop Optional css class name | '' */
  className: PropTypes.string,

  /** @prop Clears Input values | false */
  clear: PropTypes.bool,

  /** @prop Optional aria label on the clear button | null */
  clearAriaLabel: PropTypes.string,

  /** @prop Overall input container size | '' */
  containerSize: PropTypes.string,

  /** @prop Default Value same as value but used when onChange isn't invoked | '' */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /*** @prop Sets the disabled attribute of the Input | false */
  disabled: PropTypes.bool,

  /** @prop Array of Objects with message and type [{error: '', type: 'error, success, warning'}] to display error message and assign class | [] */
  messageArr: PropTypes.array,

  /** @prop Unique HTML ID used for tying label to HTML input for automated testing | null */
  htmlId: PropTypes.string,

  /** Optional Icon node that overrides right section of input | null */
  inputAfter: PropTypes.node,

  /** Optional Icon node that overrides left section of input | null */
  inputBefore: PropTypes.node,

  /** Unique HTML ID used for tying label to HTML input | null */
  id: PropTypes.string,

  /** @prop Input css class name string | '' */
  inputClassName: PropTypes.string,

  /** @prop Help Text to show form validation rules | '' */
  helpText: PropTypes.string,

  /*** @prop Optional Input ref prop type | null */
  inputRef: PropTypes.func,

  /** @prop Overall input wrapper size | '' */
  inputSize: PropTypes.string,

  /*** @prop Applies the filled attribute of the Input | false */
  isFilled: PropTypes.bool,

  /** @prop Input label text | '' */
  label: PropTypes.string,

  /** @prop Input is multiline(textarea) | false */
  multiline: PropTypes.bool,

  /*** @prop Optional Input name prop type | null */
  name: PropTypes.string,

  /** @prop Set the level of nested Input components | 0 */
  nestedLevel: PropTypes.number,

  /** @prop Callback function invoked when user types into the Input field | null */
  onChange: PropTypes.func,

  /*** @prop Callback function invoked when user is done editing Input field | null */
  onDoneEditing: PropTypes.func,

  /*** @prop Callback function invoked when user focuses on the Input field | null */
  onFocus: PropTypes.func,

  /*** @prop Callback function invoked when user presses any key | null */
  onKeyDown: PropTypes.func,

  /*** @prop Callback function invoked when user clicks on the mouse/trackpad | null */
  onMouseDown: PropTypes.func,

  /** @prop Placeholder text to display when Input is empty | '' */
  placeholder: PropTypes.string,

  /*** @prop Determines if Input can be edited | false */
  readOnly: PropTypes.bool,

  /** @prop Secondary Input label | '' */
  secondaryLabel: PropTypes.string,

  /** @prop Input shape property | '' */
  shape: PropTypes.string,

  /** @prop Input type | 'text' */
  type: PropTypes.oneOf(['text', 'number', 'password', 'email']),

  /** @prop Input value | '' */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Input.defaultProps = {
  ariaDescribedBy: null,
  ariaLabel: null,
  className: '',
  clear: false,
  clearAriaLabel: null,
  containerSize: '',
  defaultValue: '',
  disabled: false,
  messageArr: [],
  htmlId: null,
  inputAfter: null,
  inputBefore: null,
  id: null,
  inputClassName: '',
  helpText: '',
  inputRef: null,
  inputSize: '',
  isFilled: false,
  label: '',
  multiline: false,
  name: null,
  nestedLevel: 0,
  onChange: null,
  onDoneEditing: null,
  onFocus: null,
  onKeyDown: null,
  onMouseDown: null,
  placeholder: '',
  readOnly: false,
  secondaryLabel: '',
  shape: '',
  type: 'text',
  value: ''
};
Input.displayName = 'Input';
export default Input;