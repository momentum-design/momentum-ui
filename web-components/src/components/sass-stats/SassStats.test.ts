import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { LitElement } from "lit-element";
import "./SassStats";
import { SassStats } from "./SassStats";

const fixtureFactory = async (component: string): Promise<SassStats> => {
  return await fixture(html`
    <sass-stats component="badge"></sass-stats>
  `);
};

const find = <T extends LitElement>(component: T, selector: string): Element | null => {
  return component.shadowRoot!.querySelector(selector);
};

describe("SassStats component", () => {
  afterEach(fixtureCleanup);
  // color
  test("should render", async () => {
    expect.hasAssertions();
    const component: SassStats = await fixture(
      html`
        <sass-stats component="badge"></sass-stats>
      `
    );
    expect(component.component).toEqual("badge");
  });
});
