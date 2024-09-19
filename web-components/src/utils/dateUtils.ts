import { DateTime } from "luxon";

export interface DayFilters {
  minDate: DateTime | undefined;
  maxDate: DateTime | undefined;
  // eslint-disable-next-line @typescript-eslint/ban-types
  filterDate: Function | undefined;
}
export interface DatePickerProps {
  locale: string | undefined;
  selected: DateTime;
  focused: DateTime;
  weekStart: string;
}

export function now(): DateTime {
  return DateTime.local();
}

export function getStartOfWeek(date: DateTime, startDay?: string) {
  if (startDay === "Monday") {
    return date.startOf("week");
  } else {
    return date.startOf("week").minus({ days: 1 });
  }
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
  return date1.day === date2.day && date1.month === date2.month && date1.year === date2.year;
}

export function isSameMonth(date1: DateTime, date2: DateTime): boolean {
  return date1.month === date2.month;
}

export function isDayDisabled(day: DateTime, params: DayFilters): boolean {
  return (
    (params.minDate?.startOf("day") && day.startOf("day") < params.minDate?.startOf("day")) ||
    (params.maxDate?.startOf("day") && day.startOf("day") > params.maxDate?.startOf("day")) ||
    (params.filterDate && params.filterDate(day)) ||
    false
  );
}

export function shouldPrevMonthDisable(day: DateTime, minDate: DateTime): boolean {
  const firstDayOfCurrMonth = DateTime.fromObject({ month: day.month, day: 1, year: day.year });
  return minDate && minDate >= firstDayOfCurrMonth;
}

export function shouldNextMonthDisable(day: DateTime, maxDate: DateTime) {
  const lastDayOfCurrMonth = DateTime.fromObject({ month: day.month, day: day.daysInMonth, year: day.year });
  return maxDate && maxDate <= lastDayOfCurrMonth;
}
