"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ = require("../..");

var _DatePickerContext = _interopRequireDefault(require("../../DatePickerContext"));

var _dateUtils = require("../../utils/dateUtils");

var _mapContextToProps = _interopRequireDefault(require("@restart/context/mapContextToProps"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DatePickerDay = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DatePickerDay, _React$Component);

  function DatePickerDay(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.componentDidUpdate = function () {
      var _this$props = _this.props,
          day = _this$props.day,
          focus = _this$props.focus;
      (0, _dateUtils.isSameDay)(day, focus) && _this.dayButton.current.button.focus();
    };

    _this.handleClick = function (e) {
      var _this$props2 = _this.props,
          handleDayClick = _this$props2.handleDayClick,
          day = _this$props2.day;
      return handleDayClick && handleDayClick(e, day);
    };

    _this.dayButton = _react.default.createRef();
    return _this;
  }

  var _proto = DatePickerDay.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        selected = _this$props3.selected,
        focus = _this$props3.focus,
        day = _this$props3.day,
        month = _this$props3.month;
    var isOutsideMonth = month !== (0, _dateUtils.getMonth)(day);
    var isSelected = (0, _dateUtils.isSameDay)(day, selected);
    var isToday = (0, _dateUtils.isSameDay)(day, (0, _dateUtils.now)());
    var disabled = (0, _dateUtils.isDayDisabled)(day, this.props);
    var hasFocus = (0, _dateUtils.isSameDay)(day, focus);
    return _react.default.createElement(_.Button, {
      circle: true,
      size: 28,
      disabled: disabled,
      className: 'md-datepicker__day' + ("" + (isSelected && " md-datepicker__day--selected" || '')) + ("" + (hasFocus && " md-datepicker__day--focus" || '')) + ("" + (isToday && " md-datepicker__day--today" || '')) + ("" + (isOutsideMonth && " md-datepicker__day--outside-month" || '')),
      onClick: this.handleClick,
      ariaLabel: "" + day.format("D, dddd MMMM YYYY"),
      "aria-selected": isSelected,
      tabIndex: -1,
      ref: this.dayButton
    }, _react.default.createElement("div", {
      "aria-hidden": "true"
    }, (0, _dateUtils.getDate)(day)));
  };

  return DatePickerDay;
}(_react.default.Component);

DatePickerDay.propTypes = {
  /** Required day that the DatePickerDay displays */
  day: _propTypes.default.instanceOf(_moment.default).isRequired,
  // Internal Context Use Only
  focus: _propTypes.default.instanceOf(_moment.default),
  // Internal Context Use Only
  handleDayClick: _propTypes.default.func,

  /** Required month that the DatePickerDay displays */
  month: _propTypes.default.number.isRequired,
  // Internal Context Use Only
  selected: _propTypes.default.instanceOf(_moment.default)
};
DatePickerDay.displayName = 'DatePickerDay';

var _default = (0, _mapContextToProps.default)(_DatePickerContext.default, function (context) {
  return context;
}, DatePickerDay);

exports.default = _default;