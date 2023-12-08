import "@/components/icon/Icon";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Badge";
import { Badge } from "./Badge";

describe("Badge component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  // color
  test("should set badge color", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge color="blue"></md-badge>
      `
    );
    expect(component.color).not.toBeNull();
  });

  // small
  test("should set badge to small size", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge small></md-badge>
      `
    );
    expect(component.small).toBeTruthy();
  });

  // outlined
  test("should set badge style to outlined", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge outlined></md-badge>
      `
    );
    expect(component.outlined).toBeTruthy();
  });

  // custom bgColor badge
  test("should set user bgColor badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge bgColor="#000"></md-badge>
      `
    );
    expect(component.bgColor).toEqual("#000");
  });
  // custom size badge
  test("should set user bgColor badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge height="100px" width="100px"></md-badge>
      `
    );
    expect(component.height).toEqual("100px");
    expect(component.width).toEqual("100px");
  });
  // custom textColor badge
  test("should set user textColor", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge textColor="#000"></md-badge>
      `
    );
    expect(component.textColor).toEqual("#000");
  });
  // split badge
  test("should set splitted badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge split></md-badge>
      `
    );
    expect(component.split).toBeTruthy();
  });
  test("should set splitted badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge color="mint" split small>
          <span slot="split-left">
            <md-icon name="handset-active_12" style="margin-right:.75rem;height:1rem"></md-icon>
            ${"00:01"}
          </span>
          <span slot="split-right">
            <md-icon name="headset_12" style="margin-right:.75rem;height:1rem"></md-icon>
            ${"00:01"}
          </span>
        </md-badge>
      `
    );
    expect(component.split).toBeTruthy();
    expect(component.shadowRoot!.querySelectorAll("slot[name]").length).toEqual(2);
  });

  // circle
  test("should set circle badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge circle></md-badge>
      `
    );
    expect(component.circle).toBeTruthy();
  });

  test("should set aria-label for badge", async () => {
    expect.hasAssertions();
    const ariaLabel = "my aria-label";
    const component: Badge.ELEMENT = await fixture(
      html`
        <md-badge ariaLabel=${ariaLabel}></md-badge>
      `
    );
    const spanElement = component.shadowRoot?.querySelector("span");
    console.log("spanElement", spanElement?.getAttribute("aria-label"));
    expect(spanElement?.getAttribute("aria-label")).toEqual(ariaLabel);
  });
});
