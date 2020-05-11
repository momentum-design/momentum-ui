function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "../..";
import DatePickerContext from "../../DatePickerContext";
import { getDate, getMonth, isDayDisabled, isSameDay, now } from "../../utils/dateUtils";
import mapContextToProps from '@restart/context/mapContextToProps';
import moment from 'moment';

var DatePickerDay = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(DatePickerDay, _React$Component);

  function DatePickerDay(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _this.componentDidUpdate = function () {
      var _this$props = _this.props,
          day = _this$props.day,
          focus = _this$props.focus;
      isSameDay(day, focus) && _this.dayButton.current.button.focus();
    };

    _this.handleClick = function (e) {
      var _this$props2 = _this.props,
          handleDayClick = _this$props2.handleDayClick,
          day = _this$props2.day;
      return handleDayClick && handleDayClick(e, day);
    };

    _this.dayButton = React.createRef();
    return _this;
  }

  var _proto = DatePickerDay.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        selected = _this$props3.selected,
        focus = _this$props3.focus,
        day = _this$props3.day,
        month = _this$props3.month;
    var isOutsideMonth = month !== getMonth(day);
    var isSelected = isSameDay(day, selected);
    var isToday = isSameDay(day, now());
    var disabled = isDayDisabled(day, this.props);
    var hasFocus = isSameDay(day, focus);
    return React.createElement(Button, {
      circle: true,
      size: 28,
      disabled: disabled,
      className: 'md-datepicker__day' + ("" + (isSelected && " md-datepicker__day--selected" || '')) + ("" + (hasFocus && " md-datepicker__day--focus" || '')) + ("" + (isToday && " md-datepicker__day--today" || '')) + ("" + (isOutsideMonth && " md-datepicker__day--outside-month" || '')),
      onClick: this.handleClick,
      ariaLabel: "" + day.format("D, dddd MMMM YYYY"),
      "aria-selected": isSelected,
      tabIndex: -1,
      ref: this.dayButton
    }, React.createElement("div", {
      "aria-hidden": "true"
    }, getDate(day)));
  };

  return DatePickerDay;
}(React.Component);

DatePickerDay.propTypes = {
  /** Required day that the DatePickerDay displays */
  day: PropTypes.instanceOf(moment).isRequired,
  // Internal Context Use Only
  focus: PropTypes.instanceOf(moment),
  // Internal Context Use Only
  handleDayClick: PropTypes.func,

  /** Required month that the DatePickerDay displays */
  month: PropTypes.number.isRequired,
  // Internal Context Use Only
  selected: PropTypes.instanceOf(moment)
};
DatePickerDay.displayName = 'DatePickerDay';
export default mapContextToProps(DatePickerContext, function (context) {
  return context;
}, DatePickerDay);