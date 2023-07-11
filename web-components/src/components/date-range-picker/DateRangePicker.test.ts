import { now } from "@/utils/dateUtils";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime } from "luxon";
import "./DateRangePicker";
import { DateRangePicker } from "./DateRangePicker";

const fixtureFactory = async (): Promise<DateRangePicker.ELEMENT> => {
  return await fixture(html`
    <md-date-range-picker></md-date-range-picker>
  `);
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
    const el: DateRangePicker.ELEMENT = await fixture(
      html`
        <md-date-range-picker></md-date-range-picker>
      `
    );
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

    const selectFunc = jest.spyOn(DateRangePicker.ELEMENT.prototype, "handleDateSelection");
    const updateFunc = jest.spyOn(DateRangePicker.ELEMENT.prototype, "updateValue");
    
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
    const el: DateRangePicker.ELEMENT = await fixture(
      html`
        <md-date-range-picker value={''}></md-date-range-picker>
      `
    );
    const initialValue = el.value;
    el.handleSelect(firstSelect);
    expect(selectFunc).toHaveBeenCalled();
    expect(updateFunc).toHaveBeenCalled();
  
    el.handleSelect(secondSelect);
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
  describe("should handle range modification scenarios", () => {
    const startDate = DateTime.fromObject({ month: 11, day: 15 });
    const endDate = startDate.plus({ days: 5 });

    test("select date outside of and before existing range", async () => {
      const el = await fixtureFactory();
      const firstSelect = new CustomEvent("day-select", {
        detail: {
          date: startDate
        }
      });
      const secondSelect = new CustomEvent("day-select", {
        detail: {
          date: endDate
        }
      });
      const sqlConvertFunc = jest.spyOn(el, "dateToSqlTranslate");
      el.handleSelect(firstSelect);
      el.handleSelect(secondSelect);
      const additionalSelect = new CustomEvent("day-select", {
        detail: {
          date: startDate.minus({ days: 1 })
        }
      });
      el.handleSelect(additionalSelect);
      const dateObj = DateTime.fromSQL(el.startDate!);
      expect(dateObj.ordinal).toBeLessThan(startDate.ordinal);
      expect(sqlConvertFunc).toHaveBeenCalled();
    });
    test("select date outside of and after existing range", async () => {
      const el = await fixtureFactory();
      const firstSelect = new CustomEvent("day-select", {
        detail: {
          date: startDate
        }
      });
      const secondSelect = new CustomEvent("day-select", {
        detail: {
          date: endDate
        }
      });
      el.handleSelect(firstSelect);
      el.handleSelect(secondSelect);
      const additionalSelect = new CustomEvent("day-select", {
        detail: {
          date: endDate.plus({ days: 1 })
        }
      });
      el.handleSelect(additionalSelect);
      const dateObj = DateTime.fromSQL(el.endDate!);
      expect(dateObj.ordinal).toBeGreaterThan(endDate.ordinal);
    });
    test("select date inside of and closer to start date", async () => {
      const el = await fixtureFactory();
      const firstSelect = new CustomEvent("day-select", {
        detail: {
          date: startDate
        }
      });
      const secondSelect = new CustomEvent("day-select", {
        detail: {
          date: endDate
        }
      });
      el.handleSelect(firstSelect);
      el.handleSelect(secondSelect);
      const additionalSelect = new CustomEvent("day-select", {
        detail: {
          date: startDate.plus({ days: 2 })
        }
      });
      el.handleSelect(additionalSelect);
      const dateObj = DateTime.fromSQL(el.startDate!);
      expect(dateObj.ordinal).toBeGreaterThan(startDate.ordinal);
    });
    test("select date inside of and closer to end date", async () => {
      const el = await fixtureFactory();
      const firstSelect = new CustomEvent("day-select", {
        detail: {
          date: startDate
        }
      });
      const secondSelect = new CustomEvent("day-select", {
        detail: {
          date: endDate
        }
      });
      el.handleSelect(firstSelect);
      el.handleSelect(secondSelect);
      const additionalSelect = new CustomEvent("day-select", {
        detail: {
          date: endDate.minus({ days: 2 })
        }
      });
      el.handleSelect(additionalSelect);
      const dateObj = DateTime.fromSQL(el.endDate!);
      expect(dateObj.ordinal).toBeLessThan(endDate.ordinal);
    });
  });
});
