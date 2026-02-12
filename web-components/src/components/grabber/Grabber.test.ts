import "@/components/button/Button";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import { screen } from "shadow-dom-testing-library";
import "./Grabber";
import { type Grabber } from "./Grabber";

const fixtureFactory = async (): Promise<Grabber.ELEMENT> => {
  return await fixture(html` <md-grabber> </md-grabber> `);
};

describe("Grabber component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    fixtureCleanup();
  });

  test("should set Grabber", async () => {
    const component = await fixtureFactory();

    expect(component).toBeDefined();
    expect(component.checked).toBe(false);
    expect(component.collapsed).toBe(true);

    const icon = component.shadowRoot?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("arrow-right-bold");
  });

  test("should set disabled grabber", async () => {
    const element = await fixture<Grabber.ELEMENT>(`<md-grabber disabled></md-grabber>`);

    expect(element).toBeDefined();
    expect(element.disabled).toBeTruthy();
  });

  test("should set active grabber", async () => {
    const element = await fixture<Grabber.ELEMENT>(`<md-grabber checked></md-grabber>`);

    expect(element).toBeDefined();
    expect(element.checked).toBeTruthy();
    expect(element.collapsed).toBe(false);

    const icon = element.shadowRoot?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("arrow-left-bold");
  });

  test("should dispatch Action", async () => {
    const component = await fixtureFactory();
    const button = component.shadowRoot?.querySelector("button");

    const mockClick = jest.spyOn(component, "toggleGrabber");
    button?.click();
    await elementUpdated(component);

    expect(mockClick).toHaveBeenCalled();

    mockClick.mockRestore();
  });

  test("should dispatch Keyboard Action", async () => {
    const element = await fixtureFactory();

    const mockEnterClick = jest.spyOn(element, "handleKeyDown");
    element.handleKeyDown(new KeyboardEvent("Enter"));
    await elementUpdated(element);

    expect(mockEnterClick).toHaveBeenCalled();

    mockEnterClick.mockRestore();
  });

  test("should handle click", async () => {
    const component = await fixtureFactory();

    let button = screen.getByShadowRole("button");
    expect(button.getAttribute("aria-pressed")).toBe("false");

    button.click();
    await elementUpdated(component);

    button = screen.getByShadowRole("button");
    expect(button.getAttribute("aria-pressed")).toBe("true");
  });

  test("should handle mouse enter", async () => {
    const component = await fixtureFactory();

    const button = screen.getByShadowRole("button");
    expect(component.hovered).toBe(false);

    button.dispatchEvent(new MouseEvent("mouseenter"));
    await elementUpdated(component);

    expect(component.hovered).toBe(true);
  });

  test("should handle mouse leave", async () => {
    const component = await fixtureFactory();
    component.hovered = true;

    const button = screen.getByShadowRole("button");
    expect(component.hovered).toBe(true);

    button.dispatchEvent(new MouseEvent("mouseleave"));
    await elementUpdated(component);

    expect(component.hovered).toBe(false);
  });

  test("should handle focus", async () => {
    const component = await fixtureFactory();

    const button = screen.getByShadowRole("button");
    expect(component.focused).toBe(false);

    button.dispatchEvent(new FocusEvent("focus"));
    await elementUpdated(component);

    expect(component.focused).toBe(true);
  });

  test("should handle blur", async () => {
    const component = await fixtureFactory();
    component.focused = true;

    const button = screen.getByShadowRole("button");
    expect(component.focused).toBe(true);

    button.dispatchEvent(new FocusEvent("blur"));
    await elementUpdated(component);

    expect(component.focused).toBe(false);
  });

  test("should dispatch hover event on mouse enter", async () => {
    const component = await fixtureFactory();
    const button = component.shadowRoot?.querySelector("button");

    const mockDispatchHoverEvent = jest.spyOn(component, "dispatchHoverEvent");
    button?.dispatchEvent(new MouseEvent("mouseenter"));
    await elementUpdated(component);

    expect(mockDispatchHoverEvent).toHaveBeenCalled();

    mockDispatchHoverEvent.mockRestore();
  });

  test("should dispatch hover event on mouse leave", async () => {
    const component = await fixtureFactory();
    const button = component.shadowRoot?.querySelector("button");

    const mockDispatchHoverEvent = jest.spyOn(component, "dispatchHoverEvent");
    button?.dispatchEvent(new MouseEvent("mouseleave"));
    await elementUpdated(component);

    expect(mockDispatchHoverEvent).toHaveBeenCalled();

    mockDispatchHoverEvent.mockRestore();
  });

  test("should not send event when toggleGrabber is called and grabber is disabled", async () => {
    const element = await fixture<Grabber.ELEMENT>(`<md-grabber disabled></md-grabber>`);

    const mockDispatchEvent = jest.spyOn(element, "dispatchEvent");
    element.toggleGrabber();
    await elementUpdated(element);

    expect(mockDispatchEvent).not.toHaveBeenCalled();

    mockDispatchEvent.mockRestore();
  });

  describe("disableClickToggle property", () => {
    test("should have disableClickToggle default to false", async () => {
      const element = await fixture<Grabber.ELEMENT>(html`<md-grabber></md-grabber>`);
      expect(element.disableClickToggle).toBe(false);
    });

    test("should reflect the disable-click-toggle attribute", async () => {
      const element = await fixture<Grabber.ELEMENT>(html`<md-grabber disable-click-toggle></md-grabber>`);
      expect(element.disableClickToggle).toBe(true);
    });

    test("should toggle disableClickToggle property when attribute changes", async () => {
      const element = await fixture<Grabber.ELEMENT>(html`<md-grabber></md-grabber>`);
      element.setAttribute("disable-click-toggle", "");
      await element.updateComplete;
      expect(element.disableClickToggle).toBe(true);

      element.removeAttribute("disable-click-toggle");
      await element.updateComplete;
      expect(element.disableClickToggle).toBe(false);
    });
  });
});
