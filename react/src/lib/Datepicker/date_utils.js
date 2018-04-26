import moment from 'moment';

export function getDefaultLocale() {
  return moment.locale();
}

export function newDateWithOffset(utcOffset) {
  return moment()
    .utc()
    .utcOffset(utcOffset);
}

export function now(maybeFixedUtcOffset) {
  if (maybeFixedUtcOffset == null) {
    return newDate();
  }
  return newDateWithOffset(maybeFixedUtcOffset);
}

export function newDate(point) {
  return moment(point);
}

export function cloneDate(date) {
  return date.clone();
}

export function parseDate(value, { dateFormat, locale }) {
  const m = moment(value, dateFormat, locale || moment.locale(), true);
  return m.isValid() ? m : null;
}

export function isMoment(date) {
  return moment.isMoment(date);
}

export function isDate(date) {
  return moment.isDate(date);
}

export function getStartOfWeek(date) {
  return date.startOf('week');
}

export function getStartOfMonth(date) {
  return date.startOf('month');
}

export function getEndOfWeek(date) {
  return date.endOf('week');
}

export function getEndOfMonth(date) {
  return date.endOf('month');
}

export function getSecond(date) {
  return date.get('second');
}

export function getMinute(date) {
  return date.get('minute');
}

export function getHour(date) {
  return date.get('hour');
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

export function addYears(date, amount) {
  return date.add(amount, 'years');
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

export function subtractYears(date, amount) {
  return date.subtract(amount, 'years');
}

export function getLocaleData(date) {
  return date.localeData();
}

export function getWeekdayMinInLocale(locale, date) {
  return locale.weekdaysMin(date).substr(0, 1);
}

export function setTime(date, { hour, minute, second }) {
  date.set({ hour, minute, second });
  return date;
}

export function getDaysDiff(date1, date2) {
  return date1.diff(date2, 'days');
}

export function localizeDate(date, locale) {
  return date.clone().locale(locale || moment.locale());
}

export function formatDate(date, format) {
  return date.format(format);
}

export function safeDateFormat(date, { dateFormat, locale }) {
  return (
    (date &&
      date
        .clone()
        .locale(locale || moment.locale())
        .format(Array.isArray(dateFormat) ? dateFormat[0] : dateFormat)) ||
    ''
  );
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

export function isDayInRange(day, startDate, endDate) {
  const before = startDate
    .clone()
    .startOf('day')
    .subtract(1, 'seconds');
  const after = endDate
    .clone()
    .startOf('day')
    .add(1, 'seconds');
  return day
    .clone()
    .startOf('day')
    .isBetween(before, after);
}

export function isBefore(date1, date2) {
  return date1.isBefore(date2);
}

export function isAfter(date1, date2) {
  return date1.isAfter(date2);
}

export function isDayDisabled(
  day,
  { minDate, maxDate, filterDate } = {}
) {
  return (
    (minDate && day.isBefore(minDate, 'day')) ||
    (maxDate && day.isAfter(maxDate, 'day')) ||
    (filterDate && !filterDate(day.clone())) ||
    false
  );
}

export function allDaysDisabledBefore(
  day,
  unit,
  { minDate } = {}
) {
  const dateBefore = day.clone().subtract(1, unit);
  return (
    (minDate && dateBefore.isBefore(minDate, unit))
    || false
  );
}

export function allDaysDisabledAfter(
  day,
  unit,
  { maxDate } = {}
) {
  const dateAfter = day.clone().add(1, unit);
  return (
    (maxDate && dateAfter.isAfter(maxDate, unit))
    || false
  );
}
