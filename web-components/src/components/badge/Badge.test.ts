import "@/components/icon/Icon";
import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { screen } from "shadow-dom-testing-library";
import "./Badge";
import { type Badge } from "./Badge";
import "./NotificationBadge";
import { type NotificationBadge } from "./NotificationBadge";

describe("Badge component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  // color
  test("should set badge color", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html` <md-badge color="blue"></md-badge> `);
    expect(component.color).not.toBeNull();
  });

  // small
  test("should set badge to small size", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html` <md-badge small></md-badge> `);
    expect(component.small).toBeTruthy();
  });

  // outlined
  test("should set badge style to outlined", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html` <md-badge outlined></md-badge> `);
    expect(component.outlined).toBeTruthy();
  });

  // custom bgColor badge
  test("should set user bgColor badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html` <md-badge bgColor="#000"></md-badge> `);
    expect(component.bgColor).toEqual("#000");
  });
  // custom size badge
  test("should set user bgColor badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html` <md-badge height="100px" width="100px"></md-badge> `);
    expect(component.height).toEqual("100px");
    expect(component.width).toEqual("100px");
  });
  // custom textColor badge
  test("should set user textColor", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html` <md-badge textColor="#000"></md-badge> `);
    expect(component.textColor).toEqual("#000");
  });
  // split badge
  test("should set splitted badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html` <md-badge split></md-badge> `);
    expect(component.split).toBeTruthy();
  });
  test("should set splitted badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html`
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
    `);
    expect(component.split).toBeTruthy();
    expect(component.shadowRoot!.querySelectorAll("slot[name]").length).toEqual(2);
  });

  // circle
  test("should set circle badge", async () => {
    expect.hasAssertions();
    const component: Badge.ELEMENT = await fixture(html` <md-badge circle></md-badge> `);
    expect(component.circle).toBeTruthy();
  });

  test("should set aria-label for badge", async () => {
    expect.hasAssertions();
    const ariaLabel = "my aria-label";
    const component: Badge.ELEMENT = await fixture(html` <md-badge ariaLabel=${ariaLabel}></md-badge> `);
    const spanElement = component.shadowRoot?.querySelector("span");
    expect(spanElement?.getAttribute("aria-label")).toEqual(ariaLabel);
  });

  test("no attributes set", async () => {
    const component: Badge.ELEMENT = await fixture(html` <md-badge></md-badge> `);

    expect(component.bgColor).toBeFalsy();
    expect(component.textColor).toBeFalsy();
    expect(component.height).toBeFalsy();
    expect(component.width).toBeFalsy();
    expect(component.getStyles()).toBeTruthy();
  });
});

describe("Notification Badge component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render a dot badge by default", async () => {
    const el: NotificationBadge = await fixture(html` <md-notification-badge></md-notification-badge> `);
    const dot = el.shadowRoot?.querySelector(".md-notification-badge-dot");
    expect(dot).not.toBeNull();
    expect(el.type).toBe("dot");
  });

  test("should render a counter badge", async () => {
    await fixture(html` <md-notification-badge type="counter" counter="5"></md-notification-badge> `);
    const textElement = await screen.getByShadowText("5");
    expect(textElement).toBeInTheDocument();
  });

  test("should render a counter badge with max value", async () => {
    await fixture(html`
      <md-notification-badge type="counter" counter="150" max-counter="99"></md-notification-badge>
    `);
    const textElement = await screen.getByShadowText("99+");
    expect(textElement).toBeInTheDocument();
  });

  test("should render an icon badge", async () => {
    const el: NotificationBadge = await fixture(html`
      <md-notification-badge type="icon" icon-name="chat-filled"></md-notification-badge>
    `);
    const icon = el.shadowRoot?.querySelector("md-icon");
    expect(icon).not.toBeNull();
    expect(icon?.name).toBe("chat-filled");
  });

  test("should render a success badge", async () => {
    const el: NotificationBadge = await fixture(html` <md-notification-badge type="success"></md-notification-badge> `);
    const icon = el.shadowRoot?.querySelector("md-icon");
    expect(icon).not.toBeNull();
    expect(icon?.name).toBe("check-circle-badge-filled");
    expect(icon?.classList.contains("md-notification-badge-icon__success")).toBe(true);
  });

  test("should render a warning badge", async () => {
    const el: NotificationBadge = await fixture(html` <md-notification-badge type="warning"></md-notification-badge> `);
    const icon = el.shadowRoot?.querySelector("md-icon");
    expect(icon).not.toBeNull();
    expect(icon?.name).toBe("warning-badge-filled");
    expect(icon?.classList.contains("md-notification-badge-icon__warning")).toBe(true);
  });

  test("should render an error badge", async () => {
    const el: NotificationBadge = await fixture(html` <md-notification-badge type="error"></md-notification-badge> `);
    const icon = el.shadowRoot?.querySelector("md-icon");
    expect(icon).not.toBeNull();
    expect(icon?.name).toBe("error-legacy-badge-filled");
    expect(icon?.classList.contains("md-notification-badge-icon__error")).toBe(true);
  });

  test("should apply overlay class when overlay is true", async () => {
    const el: NotificationBadge = await fixture(html` <md-notification-badge overlay></md-notification-badge> `);
    const dot = el.shadowRoot?.querySelector(".md-notification-badge-dot");
    expect(dot?.classList.contains("md-notification-badge-overlay")).toBe(true);
  });

  test("should set aria-label and role", async () => {
    await fixture(html` <md-notification-badge aria-label="New notification"></md-notification-badge> `);

    waitFor(() => {
      const img = screen.getByShadowRole("img", { name: "New notification" });
      expect(img).toBeInTheDocument();
    });
  });
});
