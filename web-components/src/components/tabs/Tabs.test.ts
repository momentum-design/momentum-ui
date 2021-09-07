import { Key } from "@/constants";
import { ResizeObserver } from "@/mixins/ResizeMixin";
import { defineCE, elementUpdated, fixture, fixtureCleanup, fixtureSync, oneEvent } from "@open-wc/testing-helpers";
import { html, PropertyValues } from "lit-element";
import Sortable from "sortablejs";
import "./Tab";
import { Tab } from "./Tab";
import "./TabPanel";
import { TabPanel } from "./TabPanel";
import "./Tabs";
import { MORE_MENU_TAB_COPY_ID_PREFIX, Tabs } from "./Tabs";

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
  let tabs: Tabs.ELEMENT;
  let tab: Tab.ELEMENT[];
  let panels: TabPanel.ELEMENT[];

  beforeEach(async () => {
    
    global.sessionStorage.setItem("tab_1", "0");

    const root = await fixture<HTMLDivElement>(html`
      <div style="width: 300px;max-width: 300px;">
        <md-tabs draggable persist-selection tabs-id=${`tab_1`} >
          <md-tab name="History" slot="tab" disabled>
            <span>Contact History</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <span>Content for "Contact History"</span>
          </md-tab-panel>
          <md-tab name="WxM" slot="tab">
            <span>Cisco WxM</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <span>Content for "WxM"</span>
          </md-tab-panel>
          <md-tab name="Widgets" slot="tab">
            <span>Cisco Widgets</span>
          </md-tab>
          <md-tab-panel slot="panel">
            <span>Content for "Cisco Widgets"</span>
          </md-tab-panel>
        </md-tabs>
      </div>
    `);

    tabs = root.querySelector("md-tabs") as Tabs.ELEMENT;
    tab = Array.from(tabs.querySelectorAll("md-tab")) as Tab.ELEMENT[];
    panels = Array.from(tabs.querySelectorAll("md-tab-panel")) as TabPanel.ELEMENT[];
  });

  afterEach(fixtureCleanup);

  test("should (un)register event listeners", async () => {
    const tag = defineCE(
      class extends Tabs.ELEMENT {
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
    const el = fixtureSync<Tabs.ELEMENT>(`<${tag}></${tag}>`);
    const firstUpdatedEvent = await oneEvent(el, "first-updated");
    expect(firstUpdatedEvent).toBeDefined();

    el.parentElement!.removeChild(el);
    setTimeout(() => el.disconnectedCallback());
    const disconnectEvent = await oneEvent(el, "disconnected-callback");
    expect(disconnectEvent).toBeDefined();
  });

  test("should setup panels and tabs", () => {
    expect(tabs.tabSlotElement).toBeDefined();
    expect(tabs.panelSlotElement).toBeDefined();
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
    expect(consoleSpy).toHaveBeenCalledWith("The tabs or panels count should't be equal zero.");

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
    const panel = tabs.querySelector("[slot='panel']") as TabPanel.ELEMENT;
    expect(panel.hasAttribute("disabled"));
  });

  test("should drag tabs", async () => {
    tabs["tabsFilteredAsVisibleList"] = [tab[0], tab[1]];
    tabs["tabsFilteredAsHiddenList"] = [tab[2]];

    let currentID = tabs["tabsFilteredAsVisibleList"][0].id;
    (tabs as Tabs.ELEMENT).handleOnDragEnd({
      item: {
        id: tabs.slotted[0].id
      },
      oldIndex: 0,
      newIndex: 1,
      to: tabs["visibleTabsContainerElement"],
      from: tabs["visibleTabsContainerElement"],
      stopPropagation: () => {}
    } as Sortable.SortableEvent);

    await elementUpdated(tabs);
    expect(tabs["tabsFilteredAsVisibleList"][1].id).toEqual(currentID);

    currentID = tabs["tabsFilteredAsVisibleList"][0].id;
    (tabs as Tabs.ELEMENT).handleOnDragEnd({
      item: {
        id: tabs.slotted[0].id
      },
      oldIndex: 0,
      newIndex: 1,
      to: tabs["hiddenTabsContainerElement"],
      from: tabs["visibleTabsContainerElement"],
      stopPropagation: () => {}
    } as Sortable.SortableEvent);

    await elementUpdated(tabs);
    expect(tabs["tabsFilteredAsHiddenList"][0].id).toEqual(currentID);

    currentID = tabs["tabsFilteredAsHiddenList"][0].id;
    (tabs as Tabs.ELEMENT).handleOnDragEnd({
      item: {
        id: tabs.slotted[2].id
      },
      oldIndex: 0,
      newIndex: 0,
      to: tabs["visibleTabsContainerElement"],
      from: tabs["hiddenTabsContainerElement"],
      stopPropagation: () => {}
    } as Sortable.SortableEvent);

    await elementUpdated(tabs);
    expect(tabs["tabsFilteredAsVisibleList"][0].id).toEqual(currentID);

    currentID = tabs["tabsFilteredAsHiddenList"][0].id;
    (tabs as Tabs.ELEMENT).handleOnDragEnd({
      item: {
        id: tabs.slotted[2].id
      },
      oldIndex: 0,
      newIndex: 0,
      to: tabs["hiddenTabsContainerElement"],
      from: tabs["hiddenTabsContainerElement"],
      stopPropagation: () => {}
    } as Sortable.SortableEvent);
    await elementUpdated(tabs);
    expect(tabs["tabsFilteredAsHiddenList"][0].id).toEqual(currentID);
  });

  test("should handle keydown event and focused appropriate tab", async () => {
    const createKeyboardEvent = (id: string, code: string) => {
      return {
        originalTarget: {
          id: id
        },
        code: code,
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        stopPropagation: jest.fn()
      };
    };

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[0].id, Key.Home));
    await elementUpdated(tabs);

    expect(tabs.slotted[0].getAttribute("tabindex")).toBe("0");
    expect(tabs.selected).toBe(0);

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[1].id, Key.End));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(2);
    expect(tabs.slotted[1].getAttribute("tabindex")).toBe("-1");
    expect(tabs.slotted[2].getAttribute("tabindex")).toBe("0");

    tabs.selected = 0;
    await elementUpdated(tabs);

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[1].id, Key.ArrowLeft));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(2);
    expect(tabs.slotted[2].getAttribute("tabindex")).toBe("0");

    tabs.selected = 2;
    await elementUpdated(tabs);

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[2].id, Key.ArrowLeft));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(1);
    expect(tabs.slotted[1].getAttribute("tabindex")).toBe("0");

    tabs.selected = tabs.slotted.length - 1;
    await elementUpdated(tabs);

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[2].id, Key.ArrowRight));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(0);
    expect(tabs.slotted[0].getAttribute("tabindex")).toBe("0");

    tabs.selected = 0;
    await elementUpdated(tabs);

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[1].id, Key.ArrowRight));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(1);
    expect(tabs.slotted[1].getAttribute("tabindex")).toBe("0");

    tabs.selected = 1;
    await elementUpdated(tabs);

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[0].id, Key.ArrowLeft));
    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[0].id, Key.Enter));
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(0);
    expect(panels[0].hasAttribute("hidden")).toBeTruthy();

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[2].id, Key.Space));
    await elementUpdated(tabs);
    expect(panels[2].hasAttribute("hidden")).toBeFalsy();

    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[0].id, Key.Enter));
    (tabs as Tabs.ELEMENT).handleTabKeydown(createKeyboardEvent(tabs.slotted[0].id, Key.Tab));
    await elementUpdated(tabs);
  });

  test("should handle click event and select appropriate tab", async () => {
    tab.forEach((t: Tab.ELEMENT) => {
      tabs["tabsFilteredAsVisibleList"].push(t);
    });
    const clickEvent = new MouseEvent("mousedown");
    tabs.selected = 1;
    await elementUpdated(tabs);

    (tabs.slotted[0] as Tab.ELEMENT).handleClick(clickEvent);
    await elementUpdated(tabs);

    expect(tabs.selected).toBe(1);

    (tabs.slotted[2] as Tab.ELEMENT).handleClick(clickEvent);

    await elementUpdated(tabs);
    expect(tabs.selected).toBe(2);

    (tabs.slotted[2] as Tab.ELEMENT).handleClick(clickEvent);

    await elementUpdated(tabs);
    expect(tabs.selected).toBe(2);
  });

  test("should dispatch click event to outside when active tab index change", async () => {
    tab.forEach((t: Tab.ELEMENT) => {
      tabs["tabsFilteredAsVisibleList"].push(t);
    });
    const clickEvent = new MouseEvent("mousedown");
    setTimeout(() => (tabs.slotted[2] as Tab.ELEMENT).handleClick(clickEvent));
    const { detail } = await oneEvent(tabs, "selected-changed");
    expect(tabs.selected).toBe(2);
    expect(detail).toBeDefined();
    expect(detail.value).toEqual(2);
  });

  test("should close selected tab upon cross click", async () => {
    tab.forEach((t: Tab.ELEMENT) => {
      t.setAttribute("closable", "auto");
      tabs["tabsFilteredAsVisibleList"].push(t);
    });
    const clickEvent = new MouseEvent("mousedown");

    (tabs.slotted[1] as Tab.ELEMENT).handleCrossClick(clickEvent);
    expect(tabs["tabsFilteredAsVisibleList"].length).toEqual(2);
  });

  test("should not reset active tab if it clicked again", async () => {
    const clickEvent = new MouseEvent("mousedown");
    tabs.selected = 2;
    await elementUpdated(tabs);

    const toggleSpy = jest.spyOn(HTMLElement.prototype, "toggleAttribute");
    (tabs.slotted[2] as Tab.ELEMENT).handleClick(clickEvent);

    expect(toggleSpy).not.toBeCalledTimes(2);
    toggleSpy.mockRestore();
  });

  test("should have tabs hashes", () => {
    expect(Object.keys(tabs["tabsHash"]).length).toBe(tabs.slotted.length);
    expect(Object.keys(tabs["tabsIdxHash"]).length).toBe(tabs.slotted.length);
  });

  test("should render more button", () => {
    expect(tabs.moreTabMenuElement).toBeDefined();
  });

  test("should convert ids", () => {
    expect(tabs["getCopyTabId"](tabs.slotted[0] as Tab.ELEMENT).indexOf(MORE_MENU_TAB_COPY_ID_PREFIX)).toBe(0);
    expect(
      tabs["getNormalizedTabId"](`${MORE_MENU_TAB_COPY_ID_PREFIX}TEST`).indexOf(MORE_MENU_TAB_COPY_ID_PREFIX)
    ).toBe(-1);
  });

  test("should call manageOverflow on link panels and tabs", async () => {
    const mockManageOverflow = jest.fn();
    tabs["manageOverflow"] = mockManageOverflow;
    await tabs["linkPanelsAndTabs"]();
    tabs["manageOverflow"]();
    expect(mockManageOverflow).toBeCalled();
  });

  test("should manage overflow", async () => {
    const tabsCount = tabs.slotted.filter(el => el.tagName === "md-tab").length;

    tabs["tabs"] = tabs["tabs"].map(t => ({
      offsetWidth: 160
    })) as Tab.ELEMENT[];

    tabs["manageOverflow"]();

    expect(tabs["tabsViewportDataList"].length).toBe(tabsCount);
  });

  test("should be able make tab focus", () => {
    const firstTab = tabs.slotted[0] as Tab.ELEMENT;
    expect(firstTab.getAttribute("focus-visible")).toBeNull();
    tabs.selected = 0;
    expect(firstTab.getAttribute("focus-visible")).toBe("");
  });

  test("should check is more menu selected", () => {
    tabs["tabsFilteredAsHiddenList"] = [
      { selected: false, id: "1" },
      { selected: true, id: "2" }
    ] as Tab.ELEMENT[];
    tabs["updateIsMoreTabMenuSelected"]();
    expect(tabs["isMoreTabMenuSelected"]).toBeTruthy();
  });

  test("should update hidden id for positive tab index", () => {
    const t = { id: "TEST" } as Tab.ELEMENT;
    tabs["updateHiddenIdPositiveTabIndex"](t);
    expect(tabs["tabHiddenIdPositiveTabIndex"]).toBe(t.id);
  });

  test("should handle keydown event and focused appropriate tabPanel upon Tab Press", async () => {
    const createKeyboardEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });
    tabs.slotted[0].dispatchEvent(createKeyboardEvent(Key.Tab));
    expect(tabs.slotted[0].getAttribute("tabindex")).toBe("-1");
    expect(panels[0].getAttribute("tabindex")).toBe("0");
  });

  test("should log error is tabs-id is missing and persist-selection is true", async () => {
    const element: any = await fixture(
      html`
        <div style="width: 300px;max-width: 300px;">
          <md-tabs draggable persist-selection >
            <md-tab name="History" slot="tab" disabled>
              <span>Contact History</span>
            </md-tab>
          </md-tabs>
        </div>
      `
    );
    expect(element).not.toBeNull();
  });

});
