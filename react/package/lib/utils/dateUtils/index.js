"use strict";

exports.__esModule = true;
exports.newDateWithOffset = newDateWithOffset;
exports.now = now;
exports.getStartOfWeek = getStartOfWeek;
exports.getStartOfMonth = getStartOfMonth;
exports.getDate = getDate;
exports.getMonth = getMonth;
exports.addDays = addDays;
exports.addWeeks = addWeeks;
exports.addMonths = addMonths;
exports.subtractDays = subtractDays;
exports.subtractWeeks = subtractWeeks;
exports.subtractMonths = subtractMonths;
exports.getLocaleData = getLocaleData;
exports.getWeekdayMinInLocale = getWeekdayMinInLocale;
exports.localizeDate = localizeDate;
exports.isSameDay = isSameDay;
exports.isSameMonth = isSameMonth;
exports.isDayDisabled = isDayDisabled;
exports.shouldPrevMonthDisable = shouldPrevMonthDisable;
exports.shouldNextMonthDisable = shouldNextMonthDisable;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function newDateWithOffset(utcOffset) {
  return (0, _moment.default)().utc().utcOffset(utcOffset);
}

function now(maybeFixedUtcOffset) {
  if (maybeFixedUtcOffset == null) {
    return (0, _moment.default)();
  }

  return newDateWithOffset(maybeFixedUtcOffset);
}

function getStartOfWeek(date) {
  return date.startOf('week');
}

function getStartOfMonth(date) {
  return date.startOf('month');
} // Returns day of month


function getDate(date) {
  return date.get('date');
}

function getMonth(date) {
  return date.get('month');
}

function addDays(date, amount) {
  return date.add(amount, 'days');
}

function addWeeks(date, amount) {
  return date.add(amount, 'weeks');
}

function addMonths(date, amount) {
  return date.add(amount, 'months');
}

function subtractDays(date, amount) {
  return date.subtract(amount, "days");
}

function subtractWeeks(date, amount) {
  return date.subtract(amount, "weeks");
}

function subtractMonths(date, amount) {
  return date.subtract(amount, 'months');
}

function getLocaleData(date) {
  return date.localeData();
}

function getWeekdayMinInLocale(locale, date) {
  return locale.weekdaysMin(date).substr(0, 1);
}

function localizeDate(date, locale) {
  if (locale === void 0) {
    locale = _moment.default.locale();
  }

  return date.clone().locale(locale);
}

function isSameDay(moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day');
  } else {
    return !moment1 && !moment2;
  }
}

function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return date1.isSame(date2, 'month');
  } else {
    return !date1 && !date2;
  }
}

function isDayDisabled(day, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      filterDate = _ref.filterDate;

  return minDate && day.isBefore((0, _moment.default)(minDate), 'day') || maxDate && day.isAfter((0, _moment.default)(maxDate), 'day') || filterDate && filterDate(day.clone()) || false;
}

function shouldPrevMonthDisable(day, minDate) {
  var firstDayOfCurrMonth = day.clone().startOf('month');
  return minDate && !(0, _moment.default)(minDate).isBefore(firstDayOfCurrMonth);
}

function shouldNextMonthDisable(day, maxDate) {
  var lastDayOfCurrMonth = day.clone().endOf('month');
  return maxDate && !(0, _moment.default)(maxDate).isAfter(lastDayOfCurrMonth);
}