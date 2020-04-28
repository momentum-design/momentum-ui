"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DatePickerDay = _interopRequireDefault(require("../DatePickerDay"));

var _dateUtils = require("../../utils/dateUtils");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DatePickerWeek = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(DatePickerWeek, _React$PureComponent);

  function DatePickerWeek() {
    return _React$PureComponent.apply(this, arguments) || this;
  }

  var _proto = DatePickerWeek.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        day = _this$props.day,
        otherProps = _objectWithoutPropertiesLoose(_this$props, ["day"]);

    var renderDays = function renderDays() {
      var startOfWeek = (0, _dateUtils.getStartOfWeek)(day.clone());
      var days = [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = (0, _dateUtils.addDays)(startOfWeek.clone(), offset);
        return _react.default.createElement(_DatePickerDay.default, _extends({
          key: offset,
          day: day
        }, otherProps));
      });
      return days;
    };

    return _react.default.createElement("div", {
      className: "md-datepicker__week"
    }, renderDays());
  };

  return DatePickerWeek;
}(_react.default.PureComponent);

DatePickerWeek.displayName = 'DatePickerWeek';
DatePickerWeek.propTypes = {
  /** Required day for the DatePickerWeek */
  day: _propTypes.default.instanceOf(_moment.default).isRequired
};
var _default = DatePickerWeek;
exports.default = _default;