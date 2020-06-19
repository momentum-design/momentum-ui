import moment from 'moment';

export function newDateWithOffset(utcOffset) {
  return moment()
    .utc()
    .utcOffset(utcOffset);
}

export function now(maybeFixedUtcOffset) {
  if (maybeFixedUtcOffset == null) {
    return moment();
  }
  return newDateWithOffset(maybeFixedUtcOffset);
}

export function getStartOfWeek(date) {
  return date.startOf('week');
}

export function getStartOfMonth(date) {
  return date.startOf('month');
}

// Returns day of month
export function getDate(date) {
  return date.get('date');
}

export function getMonth(date) {
  return date.get('month');
}

export function addDays(date, amount) {
  return date.add(amount, 'days');
}

export function addWeeks(date, amount) {
  return date.add(amount, 'weeks');
}

export function addMonths(date, amount) {
  return date.add(amount, 'months');
}

export function subtractDays(date, amount) {
  return date.subtract(amount, "days");
}

export function subtractWeeks(date, amount) {
  return date.subtract(amount, "weeks");
}

export function subtractMonths(date, amount) {
  return date.subtract(amount, 'months');
}

export function getLocaleData(date) {
  return date.localeData();
}

export function getWeekdayMinInLocale(locale, date) {
  return locale.weekdaysMin(date).substr(0, 1);
}

export function localizeDate(date, locale = moment.locale()) {
  return date.clone().locale(locale);
}

export function isSameDay(moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.isSame(moment2, 'day');
  } else {
    return !moment1 && !moment2;
  }
}

export function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return date1.isSame(date2, 'month');
  } else {
    return !date1 && !date2;
  }
}

export function isDayDisabled(
  day,
  { minDate, maxDate, filterDate } = {}
) {
  return (
    (minDate && day.isBefore(moment(minDate), 'day')) ||
    (maxDate && day.isAfter(moment(maxDate), 'day')) ||
    (filterDate && filterDate(day.clone())) ||
    false
  );
}

export function shouldPrevMonthDisable(day, minDate) {
  const firstDayOfCurrMonth = day.clone().startOf('month');
  return (minDate && !moment(minDate).isBefore(firstDayOfCurrMonth));
}

export function shouldNextMonthDisable(day, maxDate) {
  const lastDayOfCurrMonth = day.clone().endOf('month');
  return (maxDate && !moment(maxDate).isAfter(lastDayOfCurrMonth));
}
