import "@/components/button/Button";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Favorite";
import { Favorite } from "./Favorite";

const fixtureFactory = async (): Promise<Favorite.ELEMENT> => {
  return await fixture(html` <md-favorite> </md-favorite> `);
};

describe("Favorite component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should set Favorite", async () => {
    const component = await fixtureFactory();

    expect(component).toBeDefined();

    const icon = component.shadowRoot?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("favorite-bold");
  });

  test("should set disabled Favorite", async () => {
    const element = await fixture<Favorite.ELEMENT>(`<md-favorite disabled></md-favorite>`);

    expect(element).toBeDefined();
    expect(element.disabled).toBeTruthy;
  });

  test("should set active Favorite", async () => {
    const element = await fixture<Favorite.ELEMENT>(`<md-favorite checked></md-favorite>`);

    expect(element).toBeDefined();
    expect(element.checked).toBeTruthy;

    const icon = element.shadowRoot?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("favorite-filled");
  });

  test("should dispatch Action", async () => {
    const component = await fixtureFactory();

    const mockClick = jest.spyOn(component, "handleFavorite");
    component.handleFavorite();
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

  test("should toggle checked state and dispatch event on Enter keydown", async () => {
    const component = await fixtureFactory();
    component.value = "test-value";
    const event = new KeyboardEvent("keydown", { code: Key.Enter });
    const spy = jest.spyOn(component, "dispatchEvent");

    component.handleElectKeyDown(event);

    expect(component.checked).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "favorite-keydown",
        detail: {
          active: true,
          value: "test-value"
        }
      })
    );
  });

  test("should toggle checked state and dispatch event on Space keydown", async () => {
    const component = await fixtureFactory();
    component.value = "test-value";
    const event = new KeyboardEvent("keydown", { code: Key.Space });
    const spy = jest.spyOn(component, "dispatchEvent");

    component.handleElectKeyDown(event);

    expect(component.checked).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "favorite-keydown",
        detail: {
          active: true,
          value: "test-value"
        }
      })
    );
  });

  test("should not toggle checked state or dispatch event on other keydown", async () => {
    const component = await fixtureFactory();
    const event = new KeyboardEvent("keydown", { code: Key.ArrowDown });
    const spy = jest.spyOn(component, "dispatchEvent");

    component.handleElectKeyDown(event);

    expect(component.checked).toBe(false);
    expect(spy).not.toHaveBeenCalled();
  });
});
