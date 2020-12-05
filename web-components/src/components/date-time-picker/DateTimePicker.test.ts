import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { DateTime } from "luxon";
import "./DateTimePicker";
import { DateTimePicker } from "./DateTimePicker";

describe("DateTimePicker Component", () => {
  afterEach(() => {
    fixtureCleanup();
  });
  test("should render", async () => {
    const el: DateTimePicker = await fixture(
      html`
        <md-date-time-picker></md-date-time-picker>>
      `
    );
    expect(el).not.toBeNull();
  });
});
