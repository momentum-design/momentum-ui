"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DatePickerWeek = _interopRequireDefault(require("../DatePickerWeek"));

var _dateUtils = require("../../utils/dateUtils");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DatePickerMonth = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DatePickerMonth, _React$Component);

  function DatePickerMonth() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.renderWeeks = function () {
      var _this$props = _this.props,
          day = _this$props.day,
          otherProps = _objectWithoutPropertiesLoose(_this$props, ["day"]);

      var i = 0;
      var currentWeekStart = (0, _dateUtils.getStartOfWeek)((0, _dateUtils.getStartOfMonth)(day.clone()));
      var weeks = [];
      var month = (0, _dateUtils.getMonth)(day);

      do {
        weeks.push( /*#__PURE__*/_react.default.createElement(_DatePickerWeek.default, _extends({
          key: i++,
          day: currentWeekStart,
          month: month
        }, otherProps)));
        currentWeekStart = (0, _dateUtils.addWeeks)(currentWeekStart.clone(), 1);
      } while ((0, _dateUtils.isSameMonth)(currentWeekStart, day));

      return weeks;
    };

    return _this;
  }

  var _proto = DatePickerMonth.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "md-datepicker__month"
    }, this.renderWeeks());
  };

  return DatePickerMonth;
}(_react.default.Component);

DatePickerMonth.displayName = 'DatePickerMonth';
DatePickerMonth.propTypes = {
  /** Required day for the DatePickerMonth */
  day: _propTypes.default.instanceOf(_moment.default).isRequired
};
var _default = DatePickerMonth;
exports.default = _default;