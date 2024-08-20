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

    const icon = component.shadowRoot?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("arrow-right-bold");
  });

  test("should set disabled grappber", async () => {
    const element = await fixture<Grabber.ELEMENT>(`<md-grabber disabled></md-grabber>`);

    expect(element).toBeDefined();
    expect(element.disabled).toBeTruthy;
  });

  test("should set active Favorite", async () => {
    const element = await fixture<Grabber.ELEMENT>(`<md-grabber checked></md-grabber>`);

    expect(element).toBeDefined();
    expect(element.checked).toBeTruthy;

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
});
