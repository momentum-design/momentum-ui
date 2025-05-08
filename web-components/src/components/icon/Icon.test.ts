import { type Icon } from "@/components/icon/Icon";
import { elementUpdated, fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Icon";

jest.mock("@momentum-ui/utils/lib/getColorValue", () => jest.fn(() => "rgba(247, 100, 74, 1)"));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('<svg><circle cx="50" cy="50" r="40" /></svg>')
  })
) as jest.Mock;

describe("Momentum Icon Component", () => {
  afterEach(fixtureCleanup);

  function getSvgElementAttribute(element: Element, attribute: string) {
    return element.shadowRoot!.querySelector("svg")?.getAttribute(attribute);
  }

  test("should render one Icon", async () => {
    const element = await fixture(`<md-icon></md-icon>`);
    expect(element).not.toBeNull();
  });

  test("momentumUI icon set size", async () => {
    const element = await fixture(
      `<md-icon class="test-class" name="accessories_16" size="24" iconSet="momentumUI" color="red"></md-icon>`
    );

    expect(element.shadowRoot!.querySelector("i")!.style.fontSize).toEqual("24px");
  });

  test("preferMomentumDesign icon size from legacy name", async () => {
    const element = await fixture(
      `<md-icon class="test-class" name="accessories_16" size="24" iconSet="preferMomentumDesign" color="red"></md-icon>`
    );

    expect(getSvgElementAttribute(element, "width")).toEqual("24px");
    expect(getSvgElementAttribute(element, "height")).toEqual("24px");
  });

  test("should allow sizeOverride prop to change icon size", async () => {
    const element = await fixture(
      `<md-icon class="test-class" name="arrow-up_16" size="24" iconSet="momentumUI" sizeOverrided iconSet="momentumUI" color="red"></md-icon>`
    );

    const expectedClasses = ["md-icon", "icon", "arrow-up_24"];
    const classList = element.shadowRoot?.querySelector("i")?.classList;
    expect(classList?.length).toEqual(expectedClasses.length);
    expect(expectedClasses.every((className) => classList?.contains(className))).toBe(true);
  });

  test("should set font-size to default if not specified", async () => {
    const element = await fixture(
      `<md-icon class="test-class" iconSet="momentumUI" name="accessibility_16"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("i")!.style.fontSize).toEqual("16px");
  });

  test("should set aria-label attribute from title prop", async () => {
    const element = await fixture(
      `<md-icon title="Icon Component" iconSet="momentumUI" name="accessibility_16"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("i")!.getAttribute("aria-label")).toEqual("Icon Component");
  });

  test("should set aria-label attribute from title prop for preferMomentumDesign", async () => {
    const element = await fixture(
      `<md-icon title="Icon Component" iconSet="preferMomentumDesign" name="accessibility_16"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("div")!.getAttribute("aria-label")).toEqual("Icon Component");
  });

  test("should set title attribute from title prop", async () => {
    const element = await fixture(
      `<md-icon title="Icon Component" iconSet="momentumUI" name="accessibility_16"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("i")!.getAttribute("title")).toEqual("Icon Component");
  });

  test("should set title attribute from title prop for preferMomentumDesign", async () => {
    const element = await fixture(
      `<md-icon title="Icon Component" iconSet="preferMomentumDesign" name="accessibility_16"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("div")!.getAttribute("title")).toEqual("Icon Component");
  });

  test("should set aria-label attribute from description prop", async () => {
    const element = await fixture(
      `<md-icon description="Test Description" iconSet="momentumUI" name="accessibility_16"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("i")!.getAttribute("aria-label")).toEqual("Test Description");
  });

  test("should set aria-label attribute from description prop for preferMomentumDesign", async () => {
    const element = await fixture(
      `<md-icon description="Test Description" iconSet="preferMomentumDesign" name="accessibility_16"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("div")!.getAttribute("aria-label")).toEqual("Test Description");
  });

  test("should set aria-label attribute from title & description props", async () => {
    const title = "Test Title";
    const description = "Test Description";
    const element = await fixture(html`
      <md-icon title="${title}" description="${description}" iconSet="momentumUI" name="accessibility_16"></md-icon>
    `);
    expect(element.shadowRoot!.querySelector("i")!.getAttribute("aria-label")).toEqual(`${title} ${description}`);
  });

  test("should set aria-label attribute from title & description props for preferMomentumDesign", async () => {
    const title = "Test Title";
    const description = "Test Description";
    const element = await fixture(html`
      <md-icon
        title="${title}"
        description="${description}"
        iconSet="preferMomentumDesign"
        name="accessibility_16"
      ></md-icon>
    `);
    expect(element.shadowRoot!.querySelector("div")!.getAttribute("aria-label")).toEqual(`${title} ${description}`);
  });

  test("should set font-size from icon name", async () => {
    const element = await fixture(`<md-icon name="accessories_24" iconSet="momentumUI"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.style.fontSize).toEqual("24px");
  });

  test("should set the color style to what the mocked getColorValue function returns", async () => {
    const element = await fixture(
      `<md-icon class="test-class" name="accessories_16" iconSet="momentumUI" color="#C9F4FF"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("i")!.style.color).toEqual("rgb(201, 244, 255)");
  });

  test("should throw console.warn when color is defined by a hex color", async () => {
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {
      /**/
    });

    const element = await fixture(
      `<md-icon class="test-class" name="accessories_16" iconSet="momentumUI" color="#C9F4FF"></md-icon>`
    );
    expect(element.shadowRoot!.querySelector("i")!.style.fontSize).toEqual("16px");
    expect(consoleWarnSpy).toBeCalledTimes(1);
    consoleWarnSpy.mockRestore();
  });

  test("should not apply design font class when designEnabled is true as we don't map the icon", async () => {
    const element = await fixture(`<md-icon .iconSet=${"momentumDesign"} name="youtube-circle_24"></md-icon>`);
    const classList = element.shadowRoot?.querySelector("i")?.classList;
    expect(classList?.contains("search-bold")).toBe(false);
  });

  test("should return correct icon font size", async () => {
    const element = await fixture<Icon.ELEMENT>(`<md-icon name="search_16"></md-icon>`);
    expect(element.iconFontSize).toEqual("16");
  });

  test("should return correct icon name", async () => {
    const element = await fixture<Icon.ELEMENT>(`<md-icon name="icon-search"></md-icon>`);
    expect(element.getIconName()).toEqual("search");
  });

  test("should handle icon click", async () => {
    const element = await fixture<Icon.ELEMENT>(`<md-icon></md-icon>`);
    const mockEvent = new MouseEvent("click");
    const mockDispatchEvent = jest.spyOn(element, "dispatchEvent");

    element.handleIconClick(mockEvent);
    expect(mockDispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "icon-click",
        detail: { srcEvent: mockEvent }
      })
    );

    mockDispatchEvent.mockRestore();
  });

  test("should render SVG icon", async () => {
    const element = await fixture<Icon.ELEMENT>(`<md-icon iconSet="momentumDesign" name="search-bold"></md-icon>`);
    await elementUpdated(element);
    expect(element.shadowRoot?.querySelector(".svg-icon-container")).not.toBeNull();
  });

  test("should render SVG icon", async () => {
    const element = await fixture<Icon.ELEMENT>(`<md-icon iconSet="svg" name="sample-svg"></md-icon>`);
    await elementUpdated(element);
    expect(element.shadowRoot?.querySelector(".svg-icon-container")).not.toBeNull();
  });
});
