import { DateTime } from "luxon";

const DATE_HYPHENS_REGEX = /(?<!\s)-+(?!\s)/g; // Matches hyphens that are *not* surrounded by spaces
const DATE_SLASHES_REGEX = /\//g; // Matches slashes

export interface DayFilters {
  minDate: DateTime | undefined;
  maxDate: DateTime | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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

export function getLocaleData(date: DateTime): string | null {
  return date.locale;
}

/**
 * Returns the short name of the weekday in the specified locale. i.e. in English, "Monday" -> "Mon"
 *
 * @param {string | null} locale - The locale to use for formatting the weekday name. If null, the default locale is used.
 * @param {DateTime} date - The DateTime object representing the date.
 * @returns {string} The short name of the weekday in the specified locale.
 */
export function getWeekdayNameShortInLocale(locale: string | null, date: DateTime): string {
  if (locale) {
    return date.setLocale(locale).weekdayShort ?? "";
  }
  return date.weekdayShort ?? "";
}

/**
 * Returns the very short name of the weekday (first character) in the specified locale.
 *
 * @param {string | null} locale - The locale to use for formatting the weekday name. If null, the default locale is used.
 * @param {DateTime} date - The DateTime object representing the date.
 * @returns {string} The very short name of the weekday (first character) in the specified locale.
 */
export function getWeekdayNameVeryShortInLocale(locale: string | null, date: DateTime): string {
  const weekdayName = getWeekdayNameShortInLocale(locale, date);
  return weekdayName ? weekdayName.substring(0, 1) : "";
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
    params.filterDate?.(day) ||
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

export function dateStringToDateTime(date: string): DateTime {
  return DateTime.fromISO(date?.replace(DATE_SLASHES_REGEX, "-"));
}

export function reformatDateString(date: string | null | undefined): string {
  if (!date) {
    return "";
  }

  const splitString = date.split("T"); // need to make sure we don't modify the time offset part!
  splitString[0] = splitString[0].replace(DATE_HYPHENS_REGEX, "/");

  return splitString.join("T");
}
