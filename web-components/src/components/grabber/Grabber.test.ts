import "@/components/button/Button";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Grabber";
import { Grabber } from "./Grabber";

const fixtureFactory = async (): Promise<Grabber.ELEMENT> => {
  return await fixture(html`
    <md-grabber> </md-grabber>
  `);
};

describe("Grabber component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should set Grabber", async () => {
    const component = await fixtureFactory();

    expect(component).toBeDefined();

    const icon = component.shadowRoot?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("favorite_16");
  });

  test("should set disabled Favorite", async () => {
    const element = await fixture<Grabber.ELEMENT>(`<md-favorite disabled></md-favorite>`);

    expect(element).toBeDefined();
    expect(element.disabled).toBeTruthy;
  });

  test("should set active Favorite", async () => {
    const element = await fixture<Grabber.ELEMENT>(`<md-favorite checked></md-favorite>`);

    expect(element).toBeDefined();
    expect(element.checked).toBeTruthy;

    const icon = element.shadowRoot?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("favorite-active_16");
  });

  test("should dispatch Action", async () => {
    const component = await fixtureFactory();

    const mockClick = jest.spyOn(component, "handleFavorite");
    component.handleFavorite(new CustomEvent("click"));
    await elementUpdated(component);

    expect(mockClick).toHaveBeenCalled();

    mockClick.mockRestore();
  });

  test("should dispatch Keyboard Action", async () => {
    const element = await fixtureFactory();

    const mockEnterClick = jest.spyOn(element, "handleElectKeyDown");
    element.handleElectKeyDown(new KeyboardEvent("Enter"));
    await elementUpdated(element);

    expect(mockEnterClick).toHaveBeenCalled();

    mockEnterClick.mockRestore();
  });
});
