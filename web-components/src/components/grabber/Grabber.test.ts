import "@/components/button/Button";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Grabber";
import { Grabber } from "./Grabber";

const fixtureFactory = async (): Promise<Grabber.ELEMENT> => {
  return await fixture(html` <md-grabber> </md-grabber> `);
};

describe("Grabber component", () => {
  afterEach(() => {
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
    expect(element.disabled).toBeTruthy;
  });

  test("should set active grabber", async () => {
    const element = await fixture<Grabber.ELEMENT>(`<md-grabber checked></md-grabber>`);

    expect(element).toBeDefined();
    expect(element.checked).toBeTruthy;
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

  test("should handle mouse down", async () => {
    const component = await fixtureFactory();
    const button = component.shadowRoot?.querySelector("button");

    const mockMouseDown = jest.spyOn(component, "handleMouseDown");
    button?.dispatchEvent(new MouseEvent("click"));
    await elementUpdated(component);

    expect(mockMouseDown).toHaveBeenCalled();

    mockMouseDown.mockRestore();
  });

  test("should handle mouse enter", async () => {
    const component = await fixtureFactory();
    const button = component.shadowRoot?.querySelector("button");

    const mockMouseEnter = jest.spyOn(component, "handleMouseEnter");
    button?.dispatchEvent(new MouseEvent("mouseenter"));
    await elementUpdated(component);

    expect(mockMouseEnter).toHaveBeenCalled();

    mockMouseEnter.mockRestore();
  });

  test("should handle mouse leave", async () => {
    const component = await fixtureFactory();
    const button = component.shadowRoot?.querySelector("button");

    const mockMouseLeave = jest.spyOn(component, "handleMouseLeave");
    button?.dispatchEvent(new MouseEvent("mouseleave"));
    await elementUpdated(component);

    expect(mockMouseLeave).toHaveBeenCalled();

    mockMouseLeave.mockRestore();
  });

  test("should handle focus", async () => {
    const component = await fixtureFactory();
    const button = component.shadowRoot?.querySelector("button");

    const mockFocus = jest.spyOn(component, "handleFocus");
    button?.dispatchEvent(new FocusEvent("focus"));
    await elementUpdated(component);

    expect(mockFocus).toHaveBeenCalled();

    mockFocus.mockRestore();
  });

  test("should handle blur", async () => {
    const component = await fixtureFactory();
    const button = component.shadowRoot?.querySelector("button");

    const mockBlur = jest.spyOn(component, "handleBlur");
    button?.dispatchEvent(new FocusEvent("blur"));
    await elementUpdated(component);

    expect(mockBlur).toHaveBeenCalled();

    mockBlur.mockRestore();
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
