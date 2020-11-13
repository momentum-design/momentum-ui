import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { Theme } from "@/components/theme/Theme";

describe("Theme", () => {
  afterEach(fixtureCleanup);

  test("should render Theme Component", async () => {
    const element = await fixture<Theme>(`<md-theme></md-theme>`);
    expect(element).not.toBeNull();
  });

  test("should return theme from setTheme() function", async () => {
    const element = await fixture<Theme>(`<md-theme darktheme></md-theme>`);
    expect(element.darkTheme).toBeTruthy;
  });

  test("should return lumos from setTheme() function", async () => {
    const element = await fixture<Theme>(`<md-theme lumos></md-theme>`);
    expect(element.lumos).toBeTruthy;
  });

  test("should return lumos in darkTheme from setTheme() function", async () => {
    const element = await fixture<Theme>(`<md-theme lumos darkTheme></md-theme>`);
    expect(element.lumos).toBeTruthy;
    expect(element.darkTheme).toBeTruthy;
  });

  test("should update when attribute is changed", async () => {
    const element = await fixture<Theme>(`<md-theme lumos darkTheme></md-theme>`);

    const changeSpy = jest.spyOn(Theme.prototype, "applyStyle" as never);
    const updatedSpy = jest.spyOn(Theme.prototype, "updated" as never);

    await elementUpdated(element);

    expect(updatedSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();

    changeSpy.mockRestore();
    updatedSpy.mockRestore();
  });
});
