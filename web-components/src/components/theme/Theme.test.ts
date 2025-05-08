import { elementUpdated, fixture, fixtureCleanup, oneEvent } from "@open-wc/testing-helpers";
import { Theme } from "./Theme";

describe("Theme", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render Theme Component", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme></md-theme>`);
    expect(element).not.toBeNull();
  });

  test("should return theme from setTheme() function", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme darktheme></md-theme>`);
    expect(element.darkTheme).toBeTruthy();
  });

  test("should return lumos from setTheme() function", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme lumos></md-theme>`);
    expect(element.lumos).toBeTruthy();
  });

  test("should return lumos in darkTheme from setTheme() function", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme lumos darkTheme></md-theme>`);
    expect(element.lumos).toBeTruthy();
    expect(element.darkTheme).toBeTruthy();
  });

  test("should update when attribute is changed", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme darkTheme></md-theme>`);

    const changeSpy = jest.spyOn(Theme.ELEMENT.prototype, "applyStyle" as never);

    element.lumos = true;

    await elementUpdated(element);
    expect(changeSpy).toHaveBeenCalled();

    changeSpy.mockRestore();
  });

  test("setTheme by name should update theme when attribute is changed", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme darkTheme></md-theme>`);

    const changeSpy = jest.spyOn(Theme.ELEMENT.prototype, "applyStyle" as never);

    element.theme = "momentumV2";

    await elementUpdated(element);
    expect(changeSpy).toHaveBeenCalled();
    changeSpy.mockReset();

    element.darkTheme = false;

    await elementUpdated(element);
    expect(changeSpy).toHaveBeenCalled();
    changeSpy.mockReset();

    element.theme = "momentum";

    await elementUpdated(element);
    expect(changeSpy).toHaveBeenCalled();
    changeSpy.mockReset();

    element.theme = "lumos";

    await elementUpdated(element);
    expect(changeSpy).toHaveBeenCalled();
    changeSpy.mockRestore();
  });

  test("should return momentumV2 in darkTheme from setTheme() function", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme darkTheme theme="momentumV2"></md-theme>`);
    expect(element.theme).toBe("momentumV2");
    expect(element.darkTheme).toBeTruthy();
  });

  test("should return lumos from setTheme() function", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme theme="lumos"></md-theme>`);
    expect(element.theme).toBe("lumos");
    expect(element.darkTheme).toBeFalsy();
  });

  test("should return momentum from setTheme() function", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme theme="momentum"></md-theme>`);
    expect(element.theme).toBe("momentum");
    expect(element.darkTheme).toBeFalsy();
  });

  test("handleVirtualTooltipChangeMessage should not update virtual tooltip content if reference does not match", async () => {
    const element = await fixture<Theme.ELEMENT>(`<md-theme></md-theme>`);
    const reference = document.createElement("div");
    const differentReference = document.createElement("div");
    const popper = document.createElement("div");
    const content = document.createElement("div");
    content.classList.add("md-tooltip__content");
    content.textContent = "New Tooltip Message";
    popper.appendChild(content);

    Object.defineProperty(element, "virtualReference", {
      value: reference,
      configurable: true
    });

    const event = new CustomEvent("tooltip-message", {
      detail: { popper, reference: differentReference },
      bubbles: true,
      composed: true
    });

    const tooltipMessagePromise = oneEvent(element, "tooltip-message");
    element.dispatchEvent(event);
    await tooltipMessagePromise;

    const virtualContent = element.shadowRoot!.querySelector(".md-tooltip__content");
    expect(virtualContent).toBeNull();
  });
});
