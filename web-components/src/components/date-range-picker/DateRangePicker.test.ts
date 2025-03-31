import { now } from "@/utils/dateUtils";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime } from "luxon";
import "./DateRangePicker";
import { DateRangePicker } from "./DateRangePicker";

const fixtureFactory = async (): Promise<DateRangePicker.ELEMENT> => {
  return await fixture(html` <md-date-range-picker></md-date-range-picker> `);
};

describe("DatePicker Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
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

  test.each([[false], [true]])(
    "should handle date selection and value update autoamtically unless Apply button present (%s)",
    async (includeApplyButton: boolean) => {
      const firstDate = DateTime.fromObject({ year: 2025, month: 11, day: 15 });
      const secondDate = firstDate.plus({ days: 5 });

      let el: DateRangePicker.ELEMENT;

      if (includeApplyButton) {
        el = await fixture(html`
          <md-date-range-picker
            .controlButtons=${{ apply: "APPLY" }}
            .startDate=${"1970-01-01"}
            .endDate=${"1970-01-02"}
          ></md-date-range-picker>
        `);
      } else {
        el = await fixture(html`
          <md-date-range-picker .startDate=${"1970-01-01"} .endDate=${"1970-01-02"}></md-date-range-picker>
        `);
      }

      await el.updateComplete;

      const defaultValue = "1970/01/01 - 1970/01/02";

      expect(el.value).toEqual(defaultValue);

      const selectFunc = jest.spyOn(el, "handleDateSelection");
      const updateFunc = jest.spyOn(el, "updateValue");

      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: firstDate } }));
      expect(selectFunc).toHaveBeenCalledTimes(1);
      expect(updateFunc).toHaveBeenCalledTimes(includeApplyButton ? 0 : 1);

      el.handleDateSelection(new CustomEvent("date-pre-selection-change", { detail: { data: secondDate } }));
      expect(selectFunc).toHaveBeenCalledTimes(2);
      expect(updateFunc).toHaveBeenCalledTimes(includeApplyButton ? 0 : 2);

      const newValue = "2025/11/15 - 2025/11/20";

      if (includeApplyButton) {
        expect(el.value).toEqual(defaultValue);
        const applyButton = el.shadowRoot!.querySelector("md-button.apply-button");
        applyButton?.dispatchEvent(new MouseEvent("click"));
        expect(updateFunc).toHaveBeenCalledTimes(1);
      }

      expect(el.value).toEqual(newValue);
    }
  );

  test("should correctly assign start/end values if use enters in reverse order", async () => {
    const firstDate = DateTime.fromObject({ month: 11, day: 15 });
    const secondDate = firstDate.minus({ days: 5 });
    const el: DateRangePicker.ELEMENT = await fixtureFactory();
    const firstSelect = new CustomEvent("date-pre-selection-change", {
      detail: {
        data: firstDate
      }
    });
    const secondSelect = new CustomEvent("date-pre-selection-change", {
      detail: {
        data: secondDate
      }
    });
    el.handleDateSelection(firstSelect);
    el.handleDateSelection(secondSelect);
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
    el.addEventListener("date-range-change", eventSpy as EventListener);

    el.handleDateSelection(
      new CustomEvent("date-pre-selection-change", { detail: { data: DateTime.fromObject({ month: 1, day: 1 }) } })
    );
    expect(el.startDate).not.toBeUndefined();
    expect(el.endDate).toBeUndefined();

    expect(eventSpy).not.toHaveBeenCalled();
    expect(capturedEvent).toBeNull();

    el.handleDateSelection(
      new CustomEvent("date-pre-selection-change", { detail: { data: DateTime.fromObject({ month: 1, day: 2 }) } })
    );
    expect(el.startDate).not.toBeUndefined();
    expect(el.startDate).not.toBeUndefined();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    expect(capturedEvent).not.toBeNull();
    expect(capturedEvent!.detail).toEqual({
      startDate: el.startDate,
      endDate: el.endDate
    });
  });

  describe("should handle range modification scenarios", () => {
    const date1 = DateTime.fromObject({ month: 11, day: 15 });
    const date2 = date1.plus({ days: 10 });
    const date3 = date2.plus({ days: 10 });
    const date4 = date3.plus({ days: 10 });

    test.each([
      [date1, date2, date3, date4],
      [date4, date3, date2, date1],
      [date2, date1, date4, date3],
      [date3, date4, date1, date2]
    ])("should handle date selection in order %s %s %s %s", async (dateA, dateB, dateC, dateD) => {
      const el = await fixtureFactory();
      expect(el.startDate).toBeUndefined();
      expect(el.endDate).toBeUndefined();

      const firstSelect = new CustomEvent("date-pre-selection-change", {
        detail: {
          data: dateA
        }
      });
      el.handleDateSelection(firstSelect);
      expect(el.startDate).toEqual(dateA.toSQLDate());
      expect(el.endDate).toBeUndefined();

      const secondSelect = new CustomEvent("date-pre-selection-change", {
        detail: {
          data: dateB
        }
      });
      el.handleDateSelection(secondSelect);
      // why use OR for the following two expects?
      // see above "should correctly assign start/end values if use enters in reverse order" test
      expect(el.startDate === dateA.toSQLDate() || el.startDate === dateB.toSQLDate()).toBeTruthy();
      expect(el.endDate === dateA.toSQLDate() || el.endDate === dateB.toSQLDate()).toBeTruthy();

      const thirdSelect = new CustomEvent("date-pre-selection-change", {
        detail: {
          data: dateC
        }
      });
      el.handleDateSelection(thirdSelect);
      expect(el.startDate).toEqual(dateC.toSQLDate());
      expect(el.endDate).toBeUndefined();

      const fourthSelect = new CustomEvent("date-pre-selection-change", {
        detail: {
          data: dateD
        }
      });
      el.handleDateSelection(fourthSelect);
      expect(el.startDate === dateC.toSQLDate() || el.startDate === dateD.toSQLDate()).toBeTruthy();
      expect(el.endDate === dateC.toSQLDate() || el.endDate === dateD.toSQLDate()).toBeTruthy();
    });
  });
});
