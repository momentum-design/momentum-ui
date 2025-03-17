import { Key } from "@/constants";
import { fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
import { nanoid } from "nanoid";
import "./MenuItem";
import { type MenuItem } from "./MenuItem";

describe("MenuItem component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should create component", async () => {
    const component: MenuItem.ELEMENT = await fixture(`<md-menu-item ><span>Test</span></md-menu-item>`);
    expect(component).toBeDefined;
  });

  test("component should be disabled", async () => {
    const component: MenuItem.ELEMENT = await fixture(`<md-menu-item disabled><span>Test</span></md-menu-item>`);
    expect(component.disabled).toBeTruthy;
    expect(component.getAttribute("tabindex")).toBe("-1");
  });

  test("component should has label", async () => {
    const component: MenuItem.ELEMENT = await fixture(`<md-menu-item label="Test"><span>Test</span></md-menu-item>`);
    expect(component.label).toEqual("Test");
  });

  test("should dispatch events to parent component", async () => {
    const id = nanoid();
    const component = await fixture<MenuItem.ELEMENT>(html` <md-menu-item id=${id}><span>Test</span></md-menu-item> `);

    const menuItemClickPromise = oneEvent(component, "menu-item-click");
    const clickEvent = new MouseEvent("mousedown");
    component.handleClick(clickEvent);

    const { detail: click } = await menuItemClickPromise;
    expect(click).toBeDefined();
    expect(click.id).toBe(id);

    const keyboardEvent = new KeyboardEvent("keydown", {
      code: Key.Enter
    });

    const menuItemKeydownPromise = oneEvent(component, "menu-item-keydown");
    component.handleKeyDown(keyboardEvent);

    const { detail: keydown } = await menuItemKeydownPromise;
    expect(keydown).toBeDefined();
    expect(keydown.id).toBe(id);
    expect(keydown.key).toBe(Key.Enter);
  });
});
