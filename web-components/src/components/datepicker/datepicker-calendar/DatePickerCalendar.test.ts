import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime } from "luxon";
import "./DatePickerCalendar";
import { type DatePickerCalendar } from "./DatePickerCalendar";

describe("DatePickerCalendar Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DatePickerCalendar.ELEMENT = await fixture(html` <md-datepicker-calendar></md-datepicker-calendar> `);
    expect(el).not.toBeNull();
  });

  test("should update view anchor date when changing months", async () => {
    const el: DatePickerCalendar.ELEMENT = await fixture(html` <md-datepicker-calendar></md-datepicker-calendar> `);
    const event = new MouseEvent("click");
    const setDateFunc = jest.spyOn(el, "setDate");

    const nextMonthButton = el.shadowRoot?.querySelector("[aria-label^='next month']");
    const prevMonthButton = el.shadowRoot?.querySelector("[aria-label^='previous month']");
    nextMonthButton?.dispatchEvent(event);
    prevMonthButton?.dispatchEvent(event);

    expect(setDateFunc).toHaveBeenCalledTimes(2);
  });

  test("should generate correct day names in header", async () => {
    const el: DatePickerCalendar.ELEMENT = await fixture(html` <md-datepicker-calendar></md-datepicker-calendar> `);

    // Set the viewAnchorDate and weekStart
    el.viewAnchorDate = DateTime.now();
    el.datePickerProps = {
      weekStart: "Monday",
      locale: "en-US",
      selected: DateTime.now(),
      focused: DateTime.now()
    };

    const header = el.header();

    const dayNames = header.map((dayTemplate) => dayTemplate.values[0]);

    expect(dayNames).toHaveLength(7);
    expect(dayNames[0]).toContain("M");
    expect(dayNames[1]).toContain("T");
    expect(dayNames[2]).toContain("W");
    expect(dayNames[3]).toContain("T");
    expect(dayNames[4]).toContain("F");
    expect(dayNames[5]).toContain("S");
    expect(dayNames[6]).toContain("S");
  });

  test("should have correct default values for new properties", async () => {
    const el: DatePickerCalendar.ELEMENT = await fixture(html` <md-datepicker-calendar></md-datepicker-calendar> `);

    expect(el.isDatePickerMonthLoading).toBe(false);
    expect(el.isDatePickerMonthError).toBe(false);
    expect(el.errorMessages).toEqual({});
    expect(el.onRetry).toBeUndefined();
  });

  test("should reflect boolean properties to attributes", async () => {
    const el: DatePickerCalendar.ELEMENT = await fixture(html` <md-datepicker-calendar></md-datepicker-calendar> `);

    // Test default attribute reflection
    expect(el.hasAttribute("is-date-picker-month-loading")).toBe(false);
    expect(el.hasAttribute("is-date-picker-month-error")).toBe(false);

    // Test setting via attributes
    const elWithAttrs: DatePickerCalendar.ELEMENT = await fixture(html`
      <md-datepicker-calendar is-date-picker-month-loading is-date-picker-month-error></md-datepicker-calendar>
    `);

    expect(elWithAttrs.isDatePickerMonthLoading).toBe(true);
    expect(elWithAttrs.isDatePickerMonthError).toBe(true);
    expect(elWithAttrs.hasAttribute("is-date-picker-month-loading")).toBe(true);
    expect(elWithAttrs.hasAttribute("is-date-picker-month-error")).toBe(true);
  });

  test("should set errorMessages object property", async () => {
    const errorMessages = {
      LOADING: "Loading...",
      HEADER: "Error Header",
      TEXT: "Error Text",
      RETRY: "Retry"
    };

    const el: DatePickerCalendar.ELEMENT = await fixture(html`
      <md-datepicker-calendar .errorMessages=${errorMessages}></md-datepicker-calendar>
    `);

    expect(el.errorMessages).toEqual(errorMessages);
  });

  test("should set onRetry property", async () => {
    const mockRetryFunction = jest.fn();

    const el: DatePickerCalendar.ELEMENT = await fixture(html`
      <md-datepicker-calendar .onRetry=${mockRetryFunction}></md-datepicker-calendar>
    `);

    expect(el.onRetry).toBe(mockRetryFunction);
  });

  test.each([
    { loading: true, error: false, expectedContent: "loading", expectedClass: "md-datepicker__loading" },
    { loading: false, error: true, expectedContent: "error", expectedClass: "md-datepicker__error-container" },
    { loading: true, error: true, expectedContent: "error", expectedClass: "md-datepicker__error-container" }, // Error takes priority
    { loading: false, error: false, expectedContent: "month", expectedClass: "md-datepicker-month" }
  ])("should render correct content based on loading/error states", async ({ loading, error, expectedContent }) => {
    const errorMessages = {
      LOADING: "Test Loading",
      HEADER: "Test Error",
      TEXT: "Test Error Text",
      RETRY: "Test Retry"
    };

    const el: DatePickerCalendar.ELEMENT = await fixture(html`
      <md-datepicker-calendar
        ?is-date-picker-month-loading=${loading}
        ?is-date-picker-month-error=${error}
        .errorMessages=${errorMessages}
      ></md-datepicker-calendar>
    `);

    await el.updateComplete;

    if (expectedContent === "loading") {
      const loadingDiv = el.shadowRoot?.querySelector(".md-datepicker__loading");
      const spinner = el.shadowRoot?.querySelector("md-spinner");
      expect(loadingDiv).toBeTruthy();
      expect(spinner).toBeTruthy();
      expect(loadingDiv?.textContent).toContain("Test Loading");
    } else if (expectedContent === "error") {
      const errorDiv = el.shadowRoot?.querySelector(".md-datepicker__error-container");
      const retryButton = el.shadowRoot?.querySelector("md-button");
      const errorIcon = el.shadowRoot?.querySelector("md-icon[name='error-legacy-bold']");
      expect(errorDiv).toBeTruthy();
      expect(retryButton).toBeTruthy();
      expect(errorIcon).toBeTruthy();
      expect(errorDiv?.textContent).toContain("Test Error");
      expect(errorDiv?.textContent).toContain("Test Error Text");
      expect(errorDiv?.textContent).toContain("Test Retry");
    } else if (expectedContent === "month") {
      const monthComponent = el.shadowRoot?.querySelector("md-datepicker-month");
      expect(monthComponent).toBeTruthy();
    }
  });

  test("should execute onRetry when handleRetryClick is called", async () => {
    const mockRetryFunction = jest.fn();
    const errorMessages = {
      LOADING: "Loading...",
      HEADER: "Error Header",
      TEXT: "Error Text",
      RETRY: "Retry"
    };

    const el: DatePickerCalendar.ELEMENT = await fixture(html`
      <md-datepicker-calendar
        is-date-picker-month-error
        .onRetry=${mockRetryFunction}
        .errorMessages=${errorMessages}
      ></md-datepicker-calendar>
    `);

    await el.updateComplete;

    const retryButton = el.shadowRoot?.querySelector("md-button");
    expect(retryButton).toBeTruthy();

    el.handleRetryClick();
    expect(mockRetryFunction).toHaveBeenCalledTimes(1);
  });

  test("should handle onRetry being undefined gracefully", async () => {
    const el: DatePickerCalendar.ELEMENT = await fixture(html`
      <md-datepicker-calendar is-date-picker-month-error></md-datepicker-calendar>
    `);

    // Should not throw error when onRetry is undefined
    expect(() => el.handleRetryClick()).not.toThrow();
  });
});
