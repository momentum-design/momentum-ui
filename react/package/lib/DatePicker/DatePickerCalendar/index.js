"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DatePickerContext = _interopRequireDefault(require("../../DatePickerContext"));

var _DatePickerMonth = _interopRequireDefault(require("../DatePickerMonth"));

var _ = require("../..");

var _dateUtils = require("../../utils/dateUtils");

var _mapContextToProps = _interopRequireDefault(require("@restart/context/mapContextToProps"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DatePickerCalendar = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DatePickerCalendar, _React$Component);

  function DatePickerCalendar(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.setDate = function (date, cb) {
      _this.setState({
        date: date
      }, cb);
    };

    _this.increaseMonth = function (event) {
      var handleMonthChange = _this.props.handleMonthChange;
      var date = _this.state.date;

      _this.setDate((0, _dateUtils.addMonths)(date.clone(), 1), function () {
        return handleMonthChange && handleMonthChange(event, _this.state.date);
      });
    };

    _this.decreaseMonth = function (event) {
      var handleMonthChange = _this.props.handleMonthChange;
      var date = _this.state.date;

      _this.setDate((0, _dateUtils.subtractMonths)(date.clone(), 1), function () {
        return handleMonthChange && handleMonthChange(event, _this.state.date);
      });
    };

    _this.state = {
      date: null
    };
    _this.nextMonthRef = _react.default.createRef();
    _this.prevMonthRef = _react.default.createRef();
    return _this;
  }

  var _proto = DatePickerCalendar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        focus = _this$props.focus,
        selected = _this$props.selected;
    this.setDate(focus || selected || (0, _dateUtils.now)());
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var focus = prevProps.focus,
        monthNavFocus = prevProps.monthNavFocus;

    if (focus && !(0, _dateUtils.isSameDay)(this.props.focus, focus)) {
      this.setDate(focus);
    }

    if (monthNavFocus !== this.props.monthNavFocus) {
      this.props.monthNavFocus === 'prev' && this.prevMonthRef.button.focus();
      this.props.monthNavFocus === 'next' && this.nextMonthRef.button.focus();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var date = this.state.date;

    var _this$props2 = this.props,
        locale = _this$props2.locale,
        monthFormat = _this$props2.monthFormat,
        nextArialLabel = _this$props2.nextArialLabel,
        previousArialLabel = _this$props2.previousArialLabel,
        otherProps = _objectWithoutPropertiesLoose(_this$props2, ["locale", "monthFormat", "nextArialLabel", "previousArialLabel"]);

    var renderMonthName = function renderMonthName() {
      return _react.default.createElement("div", {
        className: "md-datepicker__navigation--current-month"
      }, (0, _dateUtils.localizeDate)(date, locale).format(monthFormat));
    };

    var renderPreviousMonthButton = function renderPreviousMonthButton() {
      var minDate = _this2.props.minDate;
      var allPrevDaysDisabled = (0, _dateUtils.shouldPrevMonthDisable)(date, minDate);
      return _react.default.createElement(_.Icon, {
        ariaLabel: !previousArialLabel ? "previous month, " + (0, _dateUtils.subtractMonths)(date.clone(), 1).format('MMMM') : previousArialLabel,
        disabled: allPrevDaysDisabled,
        onClick: _this2.decreaseMonth,
        name: "arrow-left_16",
        buttonProps: {
          ref: function ref(_ref) {
            return _this2.prevMonthRef = _ref;
          }
        },
        tabIndex: -1
      });
    };

    var renderNextMonthButton = function renderNextMonthButton() {
      var maxDate = _this2.props.maxDate;
      var allNextDaysDisabled = (0, _dateUtils.shouldNextMonthDisable)(date, maxDate);
      return _react.default.createElement(_.Icon, {
        ariaLabel: !nextArialLabel ? "next month, " + (0, _dateUtils.addMonths)(date.clone(), 1).format('MMMM') : nextArialLabel,
        disabled: allNextDaysDisabled,
        onClick: _this2.increaseMonth,
        name: "arrow-right_16",
        buttonProps: {
          ref: function ref(_ref2) {
            return _this2.nextMonthRef = _ref2;
          }
        },
        tabIndex: -1
      });
    };

    var header = function header() {
      var startOfWeek = (0, _dateUtils.getStartOfWeek)(date.clone());
      var dayNames = [];
      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = (0, _dateUtils.addDays)((0, _dateUtils.localizeDate)(startOfWeek, locale), offset);
        var localeData = (0, _dateUtils.getLocaleData)(day);
        var weekDayName = (0, _dateUtils.getWeekdayMinInLocale)(localeData, day);
        return _react.default.createElement("div", {
          key: offset,
          className: "md-datepicker__day--name"
        }, weekDayName);
      }));
    };

    var renderMonth = function renderMonth() {
      return _react.default.createElement("div", {
        className: "md-datepicker__month-container"
      }, _react.default.createElement("div", {
        className: "md-datepicker__header"
      }, _react.default.createElement("div", {
        className: "md-datepicker__navigation"
      }, renderMonthName(), _react.default.createElement("div", {
        className: "md-datepicker__navigation--buttons"
      }, renderPreviousMonthButton(), renderNextMonthButton())), _react.default.createElement("div", {
        className: "md-datepicker__day--names"
      }, header())), _react.default.createElement(_DatePickerMonth.default, _extends({
        day: date
      }, otherProps)));
    };

    return _react.default.createElement("div", null, date && renderMonth());
  };

  return DatePickerCalendar;
}(_react.default.Component);

DatePickerCalendar.propTypes = {
  // Internal Context Use Only
  focus: _propTypes.default.instanceOf(_moment.default),
  // Internal Context Use Only
  handleMonthChange: _propTypes.default.func,

  /** Sets the language for the DatePickerCalendar | 'en' */
  locale: _propTypes.default.string,

  /** Sets the last date in which the calendar does not disable | null */
  maxDate: _propTypes.default.instanceOf(Date),

  /** Sets the first date in which the calendar does not disable | null */
  minDate: _propTypes.default.instanceOf(Date),

  /** Sets the format in how the Month is displayed | null */
  monthFormat: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),

  /** Sets which arrow button for the month navigation should have focus */
  monthNavFocus: _propTypes.default.string,

  /** Text to display for blindness accessibility features | 'next' */
  nextArialLabel: _propTypes.default.string,

  /** Text to display for blindness accessibility features | 'previous' */
  previousArialLabel: _propTypes.default.string,
  // Internal Context Use Only
  selected: _propTypes.default.instanceOf(_moment.default)
};
DatePickerCalendar.defaultProps = {
  focus: null,
  handleMonthChange: null,
  locale: 'en',
  maxDate: null,
  minDate: null,
  monthFormat: 'MMMM YYYY',
  monthNavFocus: 'prev',
  nextArialLabel: '',
  previousArialLabel: '',
  Selected: null
};
DatePickerCalendar.displayName = 'DatePickerCalendar';

var _default = (0, _mapContextToProps.default)(_DatePickerContext.default, function (context) {
  return context;
}, DatePickerCalendar);

exports.default = _default;