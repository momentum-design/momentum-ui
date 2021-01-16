import "@/components/button/Button";
import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Favorite";
import { Favorite } from "./Favorite";

const fixtureFactory = async (): Promise<Favorite> => {
  return await fixture(html`
    <md-favorite> </md-favorite>
  `);
};

describe("Favorite component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should set Favorite", async () => {
    const component = await fixtureFactory();

    expect(component).toBeDefined();

    const icon = component.shadowRoot?.querySelector("md-icon");
    expect(icon?.getAttribute("name")).toEqual("favorite_16");
  });

  test("should set disabled Favorite", async () => {
    const element = await fixture<Favorite>(`<md-favorite disabled></md-favorite>`);;

    expect(element).toBeDefined();
    expect(element.disabled).toBeTruthy;

  });

  test("should set active Favorite", async () => {
    const element = await fixture<Favorite>(`<md-favorite active></md-favorite>`);;

    expect(element).toBeDefined();
    expect(element.active).toBeTruthy;

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

  
});
