import { ResizeObserver } from "@/mixins/ResizeMixin";
import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, PropertyValues } from "lit-element";
import "./Tab";
import { Tab } from "./Tab";
import "./TabPanel";
import { TabPanel } from "./TabPanel";
import "./Tabs";
import { Tabs } from "./Tabs";

interface MyWindow extends Window {
  ResizeObserver: typeof ResizeObserver;
}

const disconnectMock = jest.fn();
const observeMock = jest.fn();
const unobserveMock = jest.fn();
const constructorMock = jest.fn();

class MockObserver {
  public observe = observeMock;
  public unobserve = unobserveMock;
  public disconnect = disconnectMock;
  constructor() {
    constructorMock();
  }
}

(window as MyWindow & typeof globalThis).ResizeObserver = jest.fn().mockImplementation(() => {
  return new MockObserver();
});

describe("Tabs", () => {
  let tabs: Tabs;
  let panels: TabPanel[];

  beforeEach(async () => {
    tabs = await fixture<Tabs>(html`
      <md-tabs>
        <md-tab slot="tab" disabled>
          <span>Contact History</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Contact History"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <span>Cisco WxM</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "WxM"</span>
        </md-tab-panel>
        <md-tab slot="tab">
          <span>Cisco Widgets</span>
        </md-tab>
        <md-tab-panel slot="panel">
          <span>Content for "Cisco Widgets"</span>
        </md-tab-panel>
      </md-tabs>
    `);
    panels = Array.from(tabs.querySelectorAll("md-tab-panel")) as TabPanel[];
  });

  afterEach(fixtureCleanup);

  test("should (un)register event listeners", async () => {
    const tag = defineCE(
      class extends Tabs {
        protected firstUpdated(changedProperties: PropertyValues) {
          super.firstUpdated(changedProperties);
          this.dispatchEvent(new CustomEvent("first-updated"));
        }
        disconnectedCallback() {
          super.disconnectedCallback();
          this.dispatchEvent(new CustomEvent("disconnected-callback"));
        }
      }
    );
    const el = fixtureSync<Tabs>(`<${tag}></${tag}>`);
    const firstUpdatedEvent = await oneEvent(el, "first-updated");
    expect(el.hasAttribute("role")).toBeTruthy();
    expect(el.getAttribute("role")).toBe("tablist");
    expect(firstUpdatedEvent).toBeDefined();

    el.parentElement!.removeChild(el);
    setTimeout(() => el.disconnectedCallback());
    const disconnectEvent = await oneEvent(el, "disconnected-callback");
    expect(disconnectEvent).toBeDefined();
  });

  test("should setup panels and tabs", () => {
    expect(tabs.tabSlot).toBeDefined();
    expect(tabs.panelSlot).toBeDefined();
  });

  test("should send warning when panels and tabs count not equal", async () => {
    const insertedTemplate = `
      <md-tab slot="tab">
        <span>Cisco Weather</span>
      </md-tab>`;

    const consoleSpy = jest.spyOn(console, "warn");
    tabs.insertAdjacentHTML("beforeend", insertedTemplate);
    await elementUpdated(tabs);

    expect(consoleSpy).toHaveBeenCalledWith("The amount of tabs (4) doesn't match the amount of panels (3).");

    consoleSpy.mockReset();

    while (tabs.firstChild) {
      tabs.removeChild(tabs.firstChild);
    }

    await elementUpdated(tabs);
    expect(consoleSpy).toHaveBeenCalledWith("The tabs or panels count should't equal zero.");

    consoleSpy.mockRestore();
  });

  test("should disabled tab that has no corresponding panel", async () => {
    const insertedTemplate = `
    <md-tab slot="tab">
      <span>Cisco Weather</span>
    </md-tab>`;
    tabs.insertAdjacentHTML("beforeend", insertedTemplate);
    await elementUpdated(tabs);

    const lastTab = tabs.slotted[tabs.slotted.length - 1];
    await elementUpdated(lastTab);
    expect(lastTab.hasAttribute("disabled")).toBeTruthy();
  });

  test("should add `disabled` attribute to panel when corresponding tab is disabled", () => {
    const panel = tabs.querySelector("[slot='panel']") as TabPanel;
    expect(panel.hasAttribute("disabled"));
  });

  test("should handle keydown event and focused appropriate tab", async () => {
    const createKeyboardEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    tabs.slotted[2].dispatchEvent(createKeyboardEvent("Home"));
    await elementUpdated(tabs);

    expect(tabs.slotted[0].getAttribute("tabindex")).toBe("0");
    expect(tabs.selected).toBe(0);

    tabs.slotted[1].dispatchEvent(createKeyboardEvent("End"));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(2);
    expect(tabs.slotted[1].getAttribute("tabindex")).toBe("-1");
    expect(tabs.slotted[2].getAttribute("tabindex")).toBe("0");

    tabs.selected = 0;
    await elementUpdated(tabs);

    tabs.slotted[1].dispatchEvent(createKeyboardEvent("ArrowLeft"));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(2);
    expect(tabs.slotted[2].getAttribute("tabindex")).toBe("0");

    tabs.selected = 2;
    await elementUpdated(tabs);

    tabs.slotted[2].dispatchEvent(createKeyboardEvent("ArrowLeft"));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(1);
    expect(tabs.slotted[1].getAttribute("tabindex")).toBe("0");

    tabs.selected = tabs.slotted.length - 1;
    await elementUpdated(tabs);

    tabs.slotted[2].dispatchEvent(createKeyboardEvent("ArrowRight"));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(0);
    expect(tabs.slotted[0].getAttribute("tabindex")).toBe("0");

    tabs.selected = 0;
    await elementUpdated(tabs);

    tabs.slotted[1].dispatchEvent(createKeyboardEvent("ArrowRight"));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(1);
    expect(tabs.slotted[1].getAttribute("tabindex")).toBe("0");

    tabs.selected = 1;
    await elementUpdated(tabs);

    tabs.slotted[0].dispatchEvent(createKeyboardEvent("ArrowLeft"));
    tabs.slotted[0].dispatchEvent(createKeyboardEvent("Enter"));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(0);
    expect(panels[0].hasAttribute("hidden")).toBeTruthy();

    tabs.slotted[2].dispatchEvent(createKeyboardEvent("Space"));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(2);
    expect(tabs.slotted[2].getAttribute("tabindex")).toBe("0");
    expect(panels[2].hasAttribute("hidden")).toBeFalsy();
  });

  test("should handle click event and select appropriate tab", async () => {
    const clickEvent = new MouseEvent("mousedown");

    tabs.selected = 1;
    await elementUpdated(tabs);

    tabs.slotted[0].dispatchEvent(clickEvent);
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(1);

    tabs.slotted[2].dispatchEvent(clickEvent);
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(2);

    tabs.slotted[2].dispatchEvent(clickEvent);
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(2);
  });

  test("should dispatch click event to outside when active tab index change", async () => {
    const clickEvent = new MouseEvent("mousedown");

    setTimeout(() => (tabs.slotted[2] as Tab).handleClick(clickEvent));

    const { detail } = await oneEvent(tabs, "selected-changed");

    expect(tabs.selected).toBe(2);
    expect(detail).toBeDefined();
    expect(detail.value).toEqual(2);
  });

  test("should not reset active tab if it clicked again", async () => {
    const clickEvent = new MouseEvent("mousedown");
    tabs.selected = 2;
    await elementUpdated(tabs);

    const toggleSpy = jest.spyOn(HTMLElement.prototype, "toggleAttribute");
    (tabs.slotted[2] as Tab).handleClick(clickEvent);

    expect(toggleSpy).not.toBeCalledTimes(2);
    toggleSpy.mockRestore();
  });

  test("should not reset active tab if it set again", async () => {
    const keyDownEvent = new KeyboardEvent("keydown", {
      code: "Enter"
    });
    tabs.selected = 2;
    await elementUpdated(tabs);

    const toggleSpy = jest.spyOn(HTMLElement.prototype, "toggleAttribute");
    (tabs.slotted[2] as Tab).handleKeyDown(keyDownEvent);

    expect(toggleSpy).not.toBeCalledTimes(2);
    toggleSpy.mockRestore();
  });
});
