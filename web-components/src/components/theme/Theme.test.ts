import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { Theme } from "./Theme";
import "./Theme.ts";

describe("Theme", () => {
  afterEach(fixtureCleanup);

  test("should render Theme Component", async () => {
    const element: Theme = await fixture(`<md-theme></md-theme>`);
    expect(element).not.toBeNull();
  });

  test("should return theme from setTheme() function", async () => {
    const element: Theme = await fixture(`<md-theme darktheme></md-theme>`);
    expect(element.darkTheme).toBeTruthy;
  });

  test("should return lumos from setTheme() function", async () => {
    const element: Theme = await fixture(`<md-theme lumos></md-theme>`);
    expect(element.lumos).toBeTruthy;
  });

  test("should return lumos in darkTheme from setTheme() function", async () => {
    const element: Theme = await fixture(`<md-theme lumos darkTheme></md-theme>`);
    expect(element.lumos).toBeTruthy;
    expect(element.darkTheme).toBeTruthy;
  });

  test("should update when attribute is changed", async () => {
    const element: Theme = await fixture(`<md-theme lumos darkTheme></md-theme>`);
    const changeSpy = jest.spyOn(Theme.prototype, "applyStyle");
    const updatedSpy = jest.spyOn(Theme.prototype, "updated");
    element.updated();
    expect(updatedSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
  });
});
