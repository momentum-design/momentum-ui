"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _ = require("./..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

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
    var inputProps = (0, _omit.default)(_extends({}, props), ['allowEmpty', 'disabled', 'handleDoneEditing', 'inputText']);
    return _react.default.createElement("span", {
      className: 'md-editable-textfield' + ("" + (alignment && " md-editable-textfield--" + alignment || ''))
    }, isEditing && _react.default.createElement(_.Input, _extends({
      className: 'md-editable-textfield__editing' + ("" + (className && " " + className || '')),
      inputRef: function inputRef(input) {
        _this2.editText = input;
      },
      onDoneEditing: this.handleBlur,
      onKeyDown: this.handleDoneKeyDown,
      value: inputText
    }, inputProps)), !isEditing && _react.default.createElement("div", _extends({
      role: "button",
      tabIndex: 0,
      className: 'md-editable-textfield__button' + ("" + (buttonClassName && " " + buttonClassName || '')),
      onClick: this.handleClick,
      onKeyPress: this.handleKey
    }, buttonProps), inputText || "\xA0"));
  };

  return EditableTextfield;
}(_react.default.Component);

EditableTextfield.displayName = 'EditableTextfield';
EditableTextfield.propTypes = {
  /** @prop Alignment css modifier | 'left' */
  alignment: _propTypes.default.oneOf(['center', 'left', 'right']),

  /** @prop Optional prop that prevents input from having null value | true */
  allowEmpty: _propTypes.default.bool,

  /** @prop Optional css class name for internal button | null */
  buttonClassName: _propTypes.default.string,

  /** @prop Optional props for internal button | '' */
  buttonProps: _propTypes.default.shape({}),

  /** @prop Optional css class string | '' */
  className: _propTypes.default.string,

  /** @prop Sets the disable attribute for EditableTextField | false */
  disabled: _propTypes.default.bool,

  /** @prop Optional function for blur | null */
  handleDoneEditing: _propTypes.default.func,

  /** @prop Text to be shown within input field | null */
  inputText: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
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
var _default = EditableTextfield;
exports.default = _default;