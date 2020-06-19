"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TimeSelector = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(TimeSelector, _React$Component);

  function TimeSelector() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      value: _this.props.value,
      isEditing: false
    };

    _this.componentDidUpdate = function (prevProps, prevState) {
      if (prevState.value !== _this.props.value && !_this.state.isEditing) {
        _this.setState({
          value: _this.props.value
        });
      }
    };

    _this.handleOnChange = function (e) {
      var _this$props = _this.props,
          unit = _this$props.unit,
          militaryTime = _this$props.militaryTime;
      var newValue = e.currentTarget.value;

      if (/[a-zA-Z]/.test(e.currentTarget.value)) {
        e.stopPropagation();
        return false;
      } else if (unit === 'h') {
        newValue = militaryTime ? (parseInt(newValue, 10) > 23 ? 23 : parseInt(newValue, 10)) || '' : (parseInt(newValue, 10) > 12 ? 12 : parseInt(newValue, 10)) || '';
      } else if (unit === 'm') {
        newValue = parseInt(newValue, 10) > 59 ? 59 : parseInt(newValue, 10) || '';
      }

      _this.setState({
        value: newValue,
        isEditing: true
      });
    };

    _this.submitChange = function (e) {
      var _this$props2 = _this.props,
          onKeyDown = _this$props2.onKeyDown,
          unit = _this$props2.unit;

      _this.setState({
        isEditing: false
      }, onKeyDown(unit, e));
    };

    _this.handleKey = function (e) {
      var newValue = e.currentTarget.value;
      var _this$props3 = _this.props,
          onKeyDown = _this$props3.onKeyDown,
          unit = _this$props3.unit;

      if (e.keyCode === 38 || e.keyCode === 40) {
        _this.setState({
          isEditing: false
        }, onKeyDown(unit, e));

        e.stopPropagation();
      } else if (e.keyCode === 65 && unit === 'pre') {
        if (newValue.includes('A')) return;

        _this.setState({
          isEditing: false
        }, onKeyDown(unit, e));

        e.stopPropagation();
      } else if (e.keyCode === 80 && unit === 'pre') {
        if (newValue.includes('P')) return;

        _this.setState({
          isEditing: false
        }, onKeyDown(unit, e));

        e.stopPropagation();
      }
    };

    return _this;
  }

  var _proto = TimeSelector.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props4 = this.props,
        inputRef = _this$props4.inputRef,
        onDownClick = _this$props4.onDownClick,
        onUpClick = _this$props4.onUpClick,
        _onWheel = _this$props4.onWheel,
        type = _this$props4.type,
        unit = _this$props4.unit;
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("i", {
      className: "icon icon-arrow-up_24",
      onClick: function onClick() {
        return _this2.setState({
          isEditing: false
        }, onUpClick);
      },
      onKeyUp: function onKeyUp() {},
      tabIndex: -1,
      role: "button"
    }), /*#__PURE__*/_react.default.createElement("input", {
      onWheel: function onWheel(e) {
        return _onWheel(unit, e);
      },
      type: type,
      minLength: 2,
      maxLength: 2,
      onClick: function onClick(e) {
        return e.currentTarget.focus();
      },
      ref: inputRef,
      onChange: this.handleOnChange,
      tabIndex: 0,
      value: this.state.value,
      onBlur: this.submitChange,
      onKeyUp: this.handleKey
    }), /*#__PURE__*/_react.default.createElement("i", {
      className: "icon icon-arrow-down_24",
      onClick: function onClick() {
        return _this2.setState({
          isEditing: false
        }, onDownClick);
      },
      onKeyUp: function onKeyUp() {},
      role: "button",
      tabIndex: -1
    }));
  };

  return TimeSelector;
}(_react.default.Component);

TimeSelector.propTypes = {
  /** Ref attribute for TimeSelector input element | null */
  inputRef: _propTypes.default.func,

  /** Choose to use military time | false */
  militaryTime: _propTypes.default.bool,

  /** Callback function invoked when user presses down | null  */
  onDownClick: _propTypes.default.func,

  /** Callback function invoked when user presses a key | null  */
  onKeyDown: _propTypes.default.func,

  /** Callback function invoked when user releases a click | null  */
  onUpClick: _propTypes.default.func,

  /** Callback function invoked when user wheels the mouse | null */
  onWheel: _propTypes.default.func,

  /** Set the type for the Input element | 'text' */
  type: _propTypes.default.string,

  /** Set the unit of time | '' */
  unit: _propTypes.default.string,

  /** Set the value of the Input element | '' */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
TimeSelector.defaultProps = {
  inputRef: null,
  militaryTime: false,
  onDownClick: null,
  onKeyDown: null,
  onUpClick: null,
  onWheel: null,
  type: 'text',
  unit: '',
  value: ''
};
TimeSelector.displayName = 'TimeSelector';
var _default = TimeSelector;
exports.default = _default;