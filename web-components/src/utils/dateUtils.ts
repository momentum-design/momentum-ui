import { DateTime } from "luxon";

export interface DayFilters {
  minDate: DateTime | null;
  maxDate: DateTime | null;
  filterDate: Function | null;
}

// export function newDateWithOffset(utcOffset) {
//   // intended for use of now() with offset, currently non-existant in practice
//   return DateTime.utc();
// }

export function now(): DateTime {
  return DateTime.local();
}

export function getStartOfWeek(date: DateTime) {
  return date.startOf("week");
}

export function getStartOfMonth(date: DateTime) {
  return date.startOf("month");
}

// Returns day of month
export function getDate(date: DateTime) {
  return date.get("day");
}

export function getMonth(date: DateTime) {
  return date.get("month");
}

export function addDays(date: DateTime, amount: number): DateTime {
  return date.plus({ days: amount });
}

export function addWeeks(date: DateTime, amount: number): DateTime {
  return date.plus({ weeks: amount });
}

export function addMonths(date: DateTime, amount: number): DateTime {
  return date.plus({ months: amount });
}

export function subtractDays(date: DateTime, amount: number): DateTime {
  return date.plus({ days: 0 - amount });
}

export function subtractWeeks(date: DateTime, amount: number): DateTime {
  return date.plus({ weeks: 0 - amount });
}

export function subtractMonths(date: DateTime, amount: number): DateTime {
  return date.plus({ months: 0 - amount });
}

export function getLocaleData(date: DateTime): string {
  return date.locale;
}

export function getWeekdayNameInLocale(locale: string, date: DateTime): string {
  return date.setLocale(locale).weekdayShort.substr(0, 1);
}

export function localizeDate(date: DateTime, locale: string): DateTime {
  return date.setLocale(locale);
}

export function isSameDay(date1: DateTime, date2: DateTime): boolean {
  return date1 === date2;
}

export function isSameMonth(date1: DateTime, date2: DateTime): boolean {
  return date1.month === date2.month;
}

export function isDayDisabled(day: DateTime, params: DayFilters): boolean {
  return (
    (params.minDate && day < params.minDate) ||
    (params.maxDate && day > params.maxDate) ||
    (params.filterDate && params.filterDate(day)) ||
    false
  );
}

export function shouldPrevMonthDisable(day: DateTime, minDate: DateTime): boolean {
  const firstDayOfCurrMonth = DateTime.fromObject({ month: day.month, day: 1 });
  return minDate && minDate >= firstDayOfCurrMonth;
}

export function shouldNextMonthDisable(day: DateTime, maxDate: DateTime) {
  const lastDayOfCurrMonth = DateTime.fromObject({ month: day.month, day: day.daysInMonth });
  return maxDate && maxDate <= lastDayOfCurrMonth;
}
