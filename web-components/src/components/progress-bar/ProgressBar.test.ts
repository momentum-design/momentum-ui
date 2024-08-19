import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./ProgressBar";
import { ProgressBar } from "./ProgressBar";

const fixtureFactory = async (): Promise<ProgressBar.ELEMENT> => {
  return await fixture(html` <md-progress-bar label="test list" value="55"></md-progress-bar> `);
};

describe("ProgressBar", () => {
  afterEach(fixtureCleanup);

  test("should render Progress Bar Component", async () => {
    const element = await fixture(`<md-progress-bar></md-progress-bar>`);
    expect(element).not.toBeNull();
  });

  test("should display correct Progress Bar color", async () => {
    const element: ProgressBar.ELEMENT = await fixtureFactory();
    element.color = "red";
    await elementUpdated(element);

    const el = element?.shadowRoot?.querySelector("span.meter");
    expect(el?.getAttribute("style")).toMatch("background: red");
  });

  test("shouldn't display any displayFormat", async () => {
    const element: ProgressBar.ELEMENT = await fixtureFactory();
    element.displayFormat = "none";
    await elementUpdated(element);

    const elLabel = element?.shadowRoot?.querySelector("span.progressbar-progress");
    expect(elLabel?.innerHTML).toMatch("");
  });

  test("should display correct displayFormat as fraction", async () => {
    const element: ProgressBar.ELEMENT = await fixture(html`
      <md-progress-bar label="test list" value="55" type="determinate"></md-progress-bar>
    `);
    element.displayFormat = "fraction";
    await elementUpdated(element);

    const elLabel = element?.shadowRoot?.querySelector("span.progressbar-progress");
    expect(elLabel?.innerHTML).toMatch("55 / 100");
  });

  test("should display correct displayFormat", async () => {
    const element: ProgressBar.ELEMENT = await fixture(html`
      <md-progress-bar label="test list" type="determinate"></md-progress-bar>
    `);
    element.value = 20;
    element.dynamic = true;
    await elementUpdated(element);

    const el = element?.shadowRoot?.querySelector("span.meter");
    expect(el?.getAttribute("style")).toMatch("background: success");

    element.value = 45;
    await elementUpdated(element);

    expect(el?.getAttribute("style")).toMatch("width: 45%; background: info");

    element.value = 70;
    await elementUpdated(element);

    expect(el?.getAttribute("style")).toMatch("width: 70%; background: warning");

    element.value = 80;
    await elementUpdated(element);

    expect(el?.getAttribute("style")).toMatch("width: 80%; background: danger");
  });

  test("dynamic get color", async () => {
    const element: ProgressBar.ELEMENT = await fixture(html` <md-progress-bar label="test list"></md-progress-bar> `);

    element.dynamic = true;

    element.valueFraction = 20;
    await elementUpdated(element);
    expect(element.getColor()).toMatch("success");

    element.valueFraction = 45;
    await elementUpdated(element);
    expect(element.getColor()).toMatch("info");

    element.valueFraction = 70;
    await elementUpdated(element);
    expect(element.getColor()).toMatch("warning");

    element.valueFraction = 80;
    await elementUpdated(element);
    expect(element.getColor()).toMatch("danger");
  });

  test("adjusted value", async () => {
    const element: ProgressBar.ELEMENT = await fixture(html`
      <md-progress-bar label="test list" type="determinate"></md-progress-bar>
    `);

    element.min = 0;
    element.max = 100;
    element.value = 25;
    await elementUpdated(element);

    expect(element.adjustedValue).toEqual(25);
    expect(element.valueFraction).toEqual(25);

    element.value = 105;
    await elementUpdated(element);
    expect(element.adjustedValue).toEqual(100);
    expect(element.valueFraction).toEqual(100);

    element.value = 0;
    element.max = 0;
    const displayFormat = element.getDisplayFormat();
    // This scenario explicitly tests the `|| 0` fallback
    expect(element.valueFraction).toBe(0);
    expect(displayFormat).toBe("0%");
  });
});
