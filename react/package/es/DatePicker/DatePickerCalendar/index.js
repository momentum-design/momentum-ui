function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import DatePickerContext from "../../DatePickerContext";
import DatePickerMonth from "../DatePickerMonth";
import { Icon } from "../..";
import { addDays, addMonths, getLocaleData, getStartOfWeek, getWeekdayMinInLocale, isSameDay, localizeDate, now, shouldNextMonthDisable, shouldPrevMonthDisable, subtractMonths } from "../../utils/dateUtils";
import mapContextToProps from '@restart/context/mapContextToProps';
import moment from 'moment';

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

      _this.setDate(addMonths(date.clone(), 1), function () {
        return handleMonthChange && handleMonthChange(event, _this.state.date);
      });
    };

    _this.decreaseMonth = function (event) {
      var handleMonthChange = _this.props.handleMonthChange;
      var date = _this.state.date;

      _this.setDate(subtractMonths(date.clone(), 1), function () {
        return handleMonthChange && handleMonthChange(event, _this.state.date);
      });
    };

    _this.state = {
      date: null
    };
    _this.nextMonthRef = /*#__PURE__*/React.createRef();
    _this.prevMonthRef = /*#__PURE__*/React.createRef();
    return _this;
  }

  var _proto = DatePickerCalendar.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        focus = _this$props.focus,
        selected = _this$props.selected;
    this.setDate(focus || selected || now());
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var focus = prevProps.focus,
        monthNavFocus = prevProps.monthNavFocus;

    if (focus && !isSameDay(this.props.focus, focus)) {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "md-datepicker__navigation--current-month"
      }, localizeDate(date, locale).format(monthFormat));
    };

    var renderPreviousMonthButton = function renderPreviousMonthButton() {
      var minDate = _this2.props.minDate;
      var allPrevDaysDisabled = shouldPrevMonthDisable(date, minDate);
      return /*#__PURE__*/React.createElement(Icon, {
        ariaLabel: !previousArialLabel ? "previous month, " + subtractMonths(date.clone(), 1).format('MMMM') : previousArialLabel,
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
      var allNextDaysDisabled = shouldNextMonthDisable(date, maxDate);
      return /*#__PURE__*/React.createElement(Icon, {
        ariaLabel: !nextArialLabel ? "next month, " + addMonths(date.clone(), 1).format('MMMM') : nextArialLabel,
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
      var startOfWeek = getStartOfWeek(date.clone());
      var dayNames = [];
      return dayNames.concat([0, 1, 2, 3, 4, 5, 6].map(function (offset) {
        var day = addDays(localizeDate(startOfWeek, locale), offset);
        var localeData = getLocaleData(day);
        var weekDayName = getWeekdayMinInLocale(localeData, day);
        return /*#__PURE__*/React.createElement("div", {
          key: offset,
          className: "md-datepicker__day--name"
        }, weekDayName);
      }));
    };

    var renderMonth = function renderMonth() {
      return /*#__PURE__*/React.createElement("div", {
        className: "md-datepicker__month-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "md-datepicker__header"
      }, /*#__PURE__*/React.createElement("div", {
        className: "md-datepicker__navigation"
      }, renderMonthName(), /*#__PURE__*/React.createElement("div", {
        className: "md-datepicker__navigation--buttons"
      }, renderPreviousMonthButton(), renderNextMonthButton())), /*#__PURE__*/React.createElement("div", {
        className: "md-datepicker__day--names"
      }, header())), /*#__PURE__*/React.createElement(DatePickerMonth, _extends({
        day: date
      }, otherProps)));
    };

    return /*#__PURE__*/React.createElement("div", null, date && renderMonth());
  };

  return DatePickerCalendar;
}(React.Component);

DatePickerCalendar.propTypes = {
  // Internal Context Use Only
  focus: PropTypes.instanceOf(moment),
  // Internal Context Use Only
  handleMonthChange: PropTypes.func,

  /** Sets the language for the DatePickerCalendar | 'en' */
  locale: PropTypes.string,

  /** Sets the last date in which the calendar does not disable | null */
  maxDate: PropTypes.instanceOf(Date),

  /** Sets the first date in which the calendar does not disable | null */
  minDate: PropTypes.instanceOf(Date),

  /** Sets the format in how the Month is displayed | null */
  monthFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /** Sets which arrow button for the month navigation should have focus */
  monthNavFocus: PropTypes.string,

  /** Text to display for blindness accessibility features | 'next' */
  nextArialLabel: PropTypes.string,

  /** Text to display for blindness accessibility features | 'previous' */
  previousArialLabel: PropTypes.string,
  // Internal Context Use Only
  selected: PropTypes.instanceOf(moment)
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
export default mapContextToProps(DatePickerContext, function (context) {
  return context;
}, DatePickerCalendar);