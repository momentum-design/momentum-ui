import "@/components/icon/Icon";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Menu";
import { type Menu } from "./Menu";

const fixtureFactory = async (): Promise<Menu.ELEMENT> => {
  return await fixture<Menu.ELEMENT>(html`
    <md-menu>
      <md-menu-item>
        <md-icon name="recents-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Contact History</span>
      </md-menu-item>
      <md-menu-item disabled>
        <md-icon name="apps-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Cisco WxM</span>
      </md-menu-item>
      <md-menu-item>
        <md-icon name="cancel-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Cisco Test</span>
      </md-menu-item>
      <md-menu-item>
        <md-icon name="alarm-bold" size="16" iconSet="momentumDesign"></md-icon>
        <span>Cisco Answer</span>
      </md-menu-item>
    </md-menu>
  `);
};

describe("Menu component", () => {  

  afterEach(() => {
    fixtureCleanup();
  });

  test("should create component", async () => {
    const component = await fixtureFactory();
    expect(component).toBeDefined();
  });

  test("should setup menu items", async () => {
    const component = await fixtureFactory();
    expect(component.menuSlotElement).toBeDefined();
  });

  test("should handle click event and select appropriate menu item", async () => {
    const component = await fixtureFactory();
    const clickEvent = new MouseEvent("mousedown");

    component.selected = 1;
    await elementUpdated(component);

    component.slotted[0].dispatchEvent(clickEvent);
    await elementUpdated(component);

    expect(component.selected).toBe(1);
  });

  test("should handle keydown event and focused appropriate menu item", async () => {
    const component = await fixtureFactory();
    const createKeyboardEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    component.slotted[2].dispatchEvent(createKeyboardEvent(Key.Home));
    await elementUpdated(component);

    expect(component.slotted[0].getAttribute("tabindex")).toBe("0");
    expect(component.selected).toBe(0);

    component.slotted[1].dispatchEvent(createKeyboardEvent(Key.End));
    await elementUpdated(component);

    expect(component.selected).toBe(3);
    expect(component.slotted[1].getAttribute("tabindex")).toBe("-1");
    expect(component.slotted[3].getAttribute("tabindex")).toBe("0");

    component.selected = 0;
    await elementUpdated(component);

    component.slotted[1].dispatchEvent(createKeyboardEvent(Key.ArrowLeft));
    await elementUpdated(component);

    expect(component.selected).toBe(3);
    expect(component.slotted[3].getAttribute("tabindex")).toBe("0");

    component.selected = 2;
    await elementUpdated(component);

    component.slotted[2].dispatchEvent(createKeyboardEvent(Key.ArrowLeft));
    await elementUpdated(component);

    expect(component.selected).toBe(1);
    expect(component.slotted[1].getAttribute("tabindex")).toBe("0");

    component.selected = component.slotted.length - 1;
    await elementUpdated(component);

    component.slotted[2].dispatchEvent(createKeyboardEvent(Key.ArrowRight));
    await elementUpdated(component);

    expect(component.selected).toBe(0);
    expect(component.slotted[0].getAttribute("tabindex")).toBe("0");

    component.slotted[0].dispatchEvent(createKeyboardEvent(Key.Enter));
    await elementUpdated(component);

    expect(component.selected).toBe(0);
  });
});
