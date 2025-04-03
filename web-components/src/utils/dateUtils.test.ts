import { DateTime } from "luxon";
import "./dateUtils";
import {
  addDays,
  addMonths,
  addWeeks,
  dateStringToDateTime,
  DayFilters,
  getDate,
  getLocaleData,
  getMonth,
  getStartOfMonth,
  getStartOfWeek,
  getWeekdayNameVeryShortInLocale,
  isDayDisabled,
  isSameDay,
  isSameMonth,
  localizeDate,
  now,
  reformatDateString,
  shouldNextMonthDisable,
  shouldPrevMonthDisable,
  subtractDays,
  subtractMonths,
  subtractWeeks
} from "./dateUtils";

describe("DateTime Module", () => {
  test("now function returns object", async () => {
    const utilFuncReturn = now();
    expect(typeof utilFuncReturn).toBe("object");
  });

  test("getStartOfWeek function returns correctly", async () => {
    const newDate = DateTime.fromSQL("2020-10-10");
    const defaultFuncReturn = getStartOfWeek(newDate);
    expect(defaultFuncReturn).toEqual(newDate.startOf("week").minus({ days: 1 }));
    const modifiedFuncReturn = getStartOfWeek(newDate, "Monday");
    expect(modifiedFuncReturn).toEqual(newDate.startOf("week"));
  });
  test("getStartOfMonth function returns correctly", async () => {
    const newDate = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = getStartOfMonth(newDate);
    expect(utilFuncReturn).toEqual(newDate.startOf("month"));
  });
  test("getDate function returns date", async () => {
    const newDate = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = getDate(newDate);
    expect(utilFuncReturn).toEqual(newDate.get("day"));
  });
  test("getMonth function returns Month", async () => {
    const newMonth = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = getMonth(newMonth);
    expect(utilFuncReturn).toEqual(newMonth.get("month"));
  });
  test("addDays function returns revised date", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = addDays(date, 1);
    expect(utilFuncReturn.day).toEqual(date.day + 1);
  });
  test("addWeeks function returns revised date", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = addWeeks(date, 1);
    expect(utilFuncReturn.weekNumber).toEqual(date.weekNumber + 1);
  });
  test("addMonths function returns revised date", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = addMonths(date, 1);
    expect(utilFuncReturn.month).toEqual(date.month + 1);
  });
  test("subtractDays function returns revised date", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = subtractDays(date, 1);
    expect(utilFuncReturn.day).toEqual(date.day - 1);
  });
  test("subtractWeeks function returns revised date", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = subtractWeeks(date, 1);
    expect(utilFuncReturn.weekNumber).toEqual(date.weekNumber - 1);
  });
  test("subtractMonths function returns revised date", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = subtractMonths(date, 1);
    expect(utilFuncReturn.month).toEqual(date.month - 1);
  });
  test("getLocaleData function returns a string", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = getLocaleData(date);
    expect(typeof utilFuncReturn).toEqual("string");
  });
  test("getWeekdayNameInLocale function returns A letter", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = getWeekdayNameVeryShortInLocale("en-GB", date);
    expect(typeof utilFuncReturn).toEqual("string");
    expect(utilFuncReturn.length).toEqual(1);
  });
  test("localizeDate function returns a modified object", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const utilFuncReturn = localizeDate(date, "en-GB");
    expect(utilFuncReturn.locale).toEqual("en-GB");
    const utilFuncReturn2 = localizeDate(utilFuncReturn, "en-US");
    expect(utilFuncReturn2.locale).not.toEqual("en-GB");
  });
  test("isSameDay function returns a correct boolean", async () => {
    const date1 = DateTime.fromSQL("2020-10-10");
    const date2 = DateTime.fromSQL("2020-10-10");
    const date3 = DateTime.fromSQL("2020-10-10").plus({ days: 2 });
    const utilFuncReturn1 = isSameDay(date1, date2);
    expect(utilFuncReturn1).toBeTruthy();
    const utilFuncReturn2 = isSameDay(date1, date3);
    expect(utilFuncReturn2).toBeFalsy();
  });
  test("isSameMonth function returns a correct boolean", async () => {
    const date1 = DateTime.fromSQL("2020-10-10");
    const date2 = DateTime.fromSQL("2020-10-10");
    const date3 = DateTime.fromSQL("2020-10-10").plus({ months: 2 });
    const utilFuncReturn1 = isSameMonth(date1, date2);
    expect(utilFuncReturn1).toBeTruthy();
    const utilFuncReturn2 = isSameMonth(date1, date3);
    expect(utilFuncReturn2).toBeFalsy();
  });

  test("isDayDisabled returns correct boolean", async () => {
    const date1 = DateTime.fromSQL("2020-10-10");
    const filters: DayFilters = {
      minDate: date1.minus({ days: 5 }),
      maxDate: date1.plus({ days: 5 }),
      filterDate: (date: DateTime) => {
        return date.weekdayShort?.startsWith("M");
      }
    };
    const invalidDate1 = date1.plus({ days: 10 });
    const invalidDate2 = date1.minus({ days: 10 });
    const validDate = date1.minus({ days: 2 });

    const utilFuncReturn1 = isDayDisabled(date1, filters);
    const utilFuncReturn2 = isDayDisabled(invalidDate1, filters);
    const utilFuncReturn3 = isDayDisabled(invalidDate2, filters);
    const utilFuncReturn4 = isDayDisabled(validDate, filters);

    if (date1.weekdayShort?.startsWith("M")) {
      expect(utilFuncReturn1).toBeTruthy();
    } else {
      expect(utilFuncReturn1).toBeFalsy();
    }

    expect(utilFuncReturn2).toBeTruthy();
    expect(utilFuncReturn3).toBeTruthy();
    expect(utilFuncReturn4).toBeFalsy();
  });

  test("shouldPrevMonthDisable returns correct boolean", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const minDateInMonth = date.minus({ month: 0 });
    const minDateOutsideMonth = date.minus({ month: 1 });
    const utilFuncReturn1 = shouldPrevMonthDisable(date, minDateInMonth);
    const utilFuncReturn2 = shouldPrevMonthDisable(date, minDateOutsideMonth);
    expect(utilFuncReturn1).toBeTruthy();
    expect(utilFuncReturn2).toBeFalsy();
  });
  test("shouldNextMonthDisable returns correct boolean", async () => {
    const date = DateTime.fromSQL("2020-10-10");
    const minDateInMonth = date.plus({ month: 0 });
    const minDateOutsideMonth = date.plus({ month: 1 });
    const utilFuncReturn1 = shouldNextMonthDisable(date, minDateInMonth);
    const utilFuncReturn2 = shouldNextMonthDisable(date, minDateOutsideMonth);
    expect(utilFuncReturn1).toBeTruthy();
    expect(utilFuncReturn2).toBeFalsy();
  });

  test("reformatDateString should format a SQL date string with slashes instead of dashes", async () => {
    expect(reformatDateString("2021-12-12")).toEqual("2021/12/12");
    expect(reformatDateString("2021-12-12T09:01:01-8:00")).toEqual("2021/12/12T09:01:01-8:00");
    expect(reformatDateString("2024-12-31 -  2025-02-01")).toEqual("2024/12/31 -  2025/02/01");
  });

  test("dateStringToDateTime should get valid DateTime from SQL date string with slashes instead of dashes", async () => {
    const dateTime = dateStringToDateTime("2023-03-15");
    expect(dateTime).toBeInstanceOf(DateTime);
    expect(dateTime.toISODate()).toEqual("2023-03-15");
  });
});
