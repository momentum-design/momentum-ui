import { now } from "@/utils/dateUtils";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime } from "luxon";
import "./DateRangePicker";
import { DateRangePicker } from "./DateRangePicker";

const fixtureFactory = async (): Promise<DateRangePicker.ELEMENT> => {
  return await fixture(html` <md-date-range-picker></md-date-range-picker> `);
};

describe("DatePicker Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DateRangePicker.ELEMENT = await fixtureFactory();
    expect(el).not.toBeNull();
  });
  test("should return a SQL formatted date string", async () => {
    const el: DateRangePicker.ELEMENT = await fixture(html` <md-date-range-picker></md-date-range-picker> `);
    const date = now();
    const formatted = date.toSQLDate();
    expect(el.dateToSqlTranslate(date)).toEqual(formatted);
  });
  test("should format a SQL date string with slashes instead of dashes", async () => {
    const el: DateRangePicker.ELEMENT = await fixtureFactory();
    const date = "2021-12-12";
    const formatted = "2021/12/12";
    expect(el.sqlDateToSlashes(date)).toEqual(formatted);
  });
  test("should handle date selection and value update", async () => {
    const firstDate = DateTime.fromObject({ month: 11, day: 15 });
    const secondDate = firstDate.plus({ days: 5 });

    const el: DateRangePicker.ELEMENT = await fixture(
      html`
        <md-date-range-picker value={''}></md-date-range-picker>
      `
    );

    const selectFunc = jest.spyOn(el, "handleDateSelection");
    const updateFunc = jest.spyOn(el, "updateValue");
    const initialValue = el.value;

    el.handleDateSelection({ detail: { data: firstDate } });
    expect(selectFunc).toHaveBeenCalled();
    expect(updateFunc).toHaveBeenCalled();

    el.handleDateSelection({ detail: { data: secondDate } });
    expect(selectFunc).toHaveBeenCalled();
    expect(updateFunc).toHaveBeenCalled();
    expect(el.value?.length).toBeGreaterThan(initialValue!.length);
  });

  test("should correctly assign start/end values if use enters in reverse order", async () => {
    const firstDate = DateTime.fromObject({ month: 11, day: 15 });
    const secondDate = firstDate.minus({ days: 5 });
    const el: DateRangePicker.ELEMENT = await fixtureFactory();
    const firstSelect = new CustomEvent("day-select", {
      detail: {
        date: firstDate
      }
    });
    const secondSelect = new CustomEvent("day-select", {
      detail: {
        date: secondDate
      }
    });
    el.handleSelect(firstSelect);
    el.handleSelect(secondSelect);
    expect(el.startDate).toEqual(secondDate.toSQLDate());
    expect(el.endDate).toEqual(firstDate.toSQLDate());
  });

  test("should only emit date-range-change event when both start and end dates set", async () => {
    const el: DateRangePicker.ELEMENT = new DateRangePicker.ELEMENT();
    expect(el.startDate).toBeUndefined();
    expect(el.endDate).toBeUndefined();

    let capturedEvent: CustomEvent | null = null;
    const eventSpy = jest.fn((event: CustomEvent) => {
      capturedEvent = event;
    }) as unknown as EventListener;
    el.addEventListener('date-range-change', eventSpy as EventListener);

    el.handleDateSelection({ detail: { data: DateTime.fromObject({ month: 1, day: 1 }) } });
    expect(el.startDate).not.toBeUndefined();
    expect(el.endDate).toBeUndefined();

    expect(eventSpy).not.toHaveBeenCalled();
    expect(capturedEvent).toBeNull();

    el.handleDateSelection({ detail: { data: DateTime.fromObject({ month: 1, day: 2 }) } });
    expect(el.startDate).not.toBeUndefined();
    expect(el.startDate).not.toBeUndefined();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(capturedEvent).not.toBeNull();
    expect(capturedEvent!.detail).toEqual({
      startDate: el.startDate,
      endDate: el.endDate,
    });
  });

  describe("should handle range modification scenarios", () => {
    const date1 =  DateTime.fromObject({ month: 11, day: 15 });
    const date2 = date1.plus({ days: 10 });
    const date3 = date2.plus({ days: 10 });
    const date4 = date3.plus({ days: 10 });

    test.each([
      [date1, date2, date3, date4],
      [date4, date3, date2, date1],
      [date2, date1, date4, date3],
      [date3, date4, date1, date2]
      ]
    )
    ("should handle date selection in order %s %s %s %s", async (dateA, dateB, dateC, dateD) => {
      const el = await fixtureFactory();
      expect(el.startDate).toBeUndefined();
      expect(el.endDate).toBeUndefined();

      const firstSelect = new CustomEvent("day-select", {
        detail: {
          date: dateA
        }
      });
      el.handleSelect(firstSelect);
      expect(el.startDate).toEqual(dateA.toSQLDate());
      expect(el.endDate).toBeUndefined();

      const secondSelect = new CustomEvent("day-select", {
        detail: {
          date: dateB
        }
      });
      el.handleSelect(secondSelect);
      // why use OR for the following two expects?
      // see above "should correctly assign start/end values if use enters in reverse order" test
      expect(el.startDate === dateA.toSQLDate() || el.startDate === dateB.toSQLDate()).toBeTruthy();
      expect(el.endDate === dateA.toSQLDate() || el.endDate === dateB.toSQLDate()).toBeTruthy();

      const thirdSelect = new CustomEvent("day-select", {
        detail: {
          date: dateC
        }
      });
      el.handleSelect(thirdSelect);
      expect(el.startDate).toEqual(dateC.toSQLDate());
      expect(el.endDate).toBeUndefined();

      const fourthSelect = new CustomEvent("day-select", {
        detail: {
          date: dateD
        }
      });
      el.handleSelect(fourthSelect);
      expect(el.startDate === dateC.toSQLDate() || el.startDate === dateD.toSQLDate()).toBeTruthy();
      expect(el.endDate === dateC.toSQLDate() || el.endDate === dateD.toSQLDate()).toBeTruthy();
    });
  });
});
