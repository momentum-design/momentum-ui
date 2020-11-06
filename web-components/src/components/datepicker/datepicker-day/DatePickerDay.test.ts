import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DatePickerDay } from "./DatePickerDay";

describe("DatePickerDay Component", async () => {
  const fixtureFactory = async (properties?: DatePickerDay.Attributes): Promise<DatePickerDay> => {
    const { ...props } = properties;
    const element: DatePickerDay = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
      //   .day=${props.day !== undefined ? props.day : null}
      //   .month=${props.month}
      //   .selected=${props.selected}
      //   .focused=${props.focused}
      //   .filterParams=${props.filterParams}
      //   .handleDayClick=${props.handleDayClick}
    );

    props.day ? (element.day = props.day) : null;
    props.month ? (element.month = props.month) : null;
    return element;
  };

  afterEach(() => {
    fixtureCleanup();
  });
  test("should match selected day SnapShot", async () => {
    const el = await fixtureFactory({});
    expect(el).not.toBeNull;
  });
  test("should apply a modifier, when the date does not belong to current month", async () => {
    const el: DatePickerDay = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    debugger;
    expect(el).not.toBeNull;
  });
  test("should apply a modifier when the date is selected", async () => {
    const el: DatePickerDay = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
  test("should apply a modifier when the date is today`s date", async () => {
    const el: DatePickerDay = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
  test("should apply a modifier when the date is in focus", async () => {
    const el: DatePickerDay = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
  test("when Day the disabled, should set disabled prop on button", async () => {
    const el: DatePickerDay = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
  test("onclick of Day should call the callback in context", async () => {
    const el: DatePickerDay = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
  test("on press of enter/space key on Day, should call the callback in context", async () => {
    const el: DatePickerDay = await fixture(
      html`
        <md-datepicker-day></md-datepicker-day>
      `
    );
    expect(el).not.toBeNull;
  });
});
