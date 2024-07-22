import { fixture, fixtureCleanup, html } from "@open-wc/testing-helpers";
import "./Icon";

jest.mock("@momentum-ui/utils/lib/getColorValue", () => jest.fn(() => "rgba(247, 100, 74, 1)"));

describe("Momentun Icon Component", () => {
  beforeEach(() => {
    jest.resetModules();
    console.warn = jest.fn();
  });

  afterEach(fixtureCleanup);
  test("should render one Icon", async () => {
    const element = await fixture(`<md-icon></md-icon>`);
    expect(element).not.toBeNull();
  });
  test("should set font-size from size attribute if specified", async () => {
    const element = await fixture(`<md-icon class="test-class" name="accessories_16" size="24" color="red"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.style.fontSize).toEqual("24px");
  });

  test("should allow sizeOverride prop to change icon size", async () => {
    const element = await fixture(
      `<md-icon class="test-class" name="arrow-up_16" size="24" sizeOverrided color="red"></md-icon>`
    );

    const expectedClasses = ["md-icon", "icon", "arrow-up_24"];
    const classList = element.shadowRoot?.querySelector("i")?.classList;
    expect(classList?.length).toEqual(expectedClasses.length);
    expect(expectedClasses.every(className => classList?.contains(className))).toBe(true);
  });

  test("should set font-size to default if not specified", async () => {
    const element = await fixture(`<md-icon class="test-class" name="accessibility_16"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.style.fontSize).toEqual("16px");
  });

  test("should set aria-label attribute from title prop", async () => {
    const element = await fixture(`<md-icon title="Icon Component" name="accessibility_16"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.getAttribute("aria-label")).toEqual("Icon Component");
  });

  test("should set title attribute from title prop", async () => {
    const element = await fixture(`<md-icon title="Icon Component" name="accessibility_16"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.getAttribute("title")).toEqual("Icon Component");
  });

  test("should set aria-label attribute from description prop", async () => {
    const element = await fixture(`<md-icon description="Test Description" name="accessibility_16"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.getAttribute("aria-label")).toEqual("Test Description");
  });

  test("should set aria-label attribute from title & description props", async () => {
    const title = "Test Title";
    const description = "Test Description";
    const element = await fixture(
      html`
        <md-icon title="${title}" description="${description}" name="accessibility_16"></md-icon>
      `
    );
    expect(element.shadowRoot!.querySelector("i")!.getAttribute("aria-label")).toEqual(`${title} ${description}`);
  });

  test("should set font-size from icon name", async () => {
    const element = await fixture(`<md-icon name="accessories_24"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.style.fontSize).toEqual("24px");
  });

  test("should set the color style to what the mocked getColorValue function returns", async () => {
    const element = await fixture(`<md-icon class="test-class" name="accessories_16" color="#C9F4FF"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.style.color).toEqual("rgb(201, 244, 255)");
  });

  test("should throw console.warn when color is defined by a hex color", async () => {
    const element = await fixture(`<md-icon class="test-class" name="accessories_16" color="#C9F4FF"></md-icon>`);
    expect(element.shadowRoot!.querySelector("i")!.style.fontSize).toEqual("16px");
    expect(console.warn).toBeCalledTimes(1);
  });
});
