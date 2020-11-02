import "@/components/button/Button";
import { Button } from "@/components/button/Button";
import { Key } from "@/constants";
import { fixture, fixtureCleanup, html, oneEvent } from "@open-wc/testing-helpers";
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
const lmButtonTokens = require("./tokens/lm-button-tokens.js");

describe("Button Tokens", () => {
  test("Token Import should not be null", async () => {
    expect(lmButtonTokens).not.toBeNull();
  });

  test("Token Import should not be null", async () => {
    expect(lmButtonTokens).not.toBeNull();
  });
});

describe("Button", () => {
  afterEach(fixtureCleanup);

  test("should render one Button", async () => {
    const element = await fixture(`<md-button></md-button>`);
    expect(element).not.toBeNull();
  });

  test("should render anchor if passed tag a", async () => {
    const element = await fixture(`<md-button tag="a"></md-button>`);
    expect(element.shadowRoot!.querySelectorAll("a").length).toEqual(1);
  });

  test("should render input if passed tag input", async () => {
    const element = await fixture(`<md-button tag="input"></md-button>`);
    expect(element.shadowRoot!.querySelectorAll("input").length).toEqual(1);
  });

  test("should render button by default", async () => {
    const element = await fixture(`<md-button></md-button>`);
    expect(element.shadowRoot!.querySelectorAll("button").length).toEqual(1);
  });

  test("should render Loading component is pass loading props", async () => {
    const element = await fixture(`<md-button loading></md-button>`);
    expect(element.shadowRoot!.querySelectorAll("md-spinner").length).toEqual(1);
  });

  test("should not render Loading component is loading props absent", async () => {
    const element = await fixture(`<md-button></md-button>`);
    expect(element.shadowRoot!.querySelectorAll("md-loading").length).toEqual(0);
  });

  test("should remove all styles from component if hasRemoveStyle props exist", async () => {
    const element = await fixture(`<md-button hasRemoveStyle color="blue" size="52"></md-button>`);
    expect(element.shadowRoot!.querySelectorAll(".md-button--blue").length).toEqual(0);
    expect(element.shadowRoot!.querySelectorAll(".md-button--none").length).toEqual(1);
    expect(element.shadowRoot!.querySelectorAll(".md-button--52").length).toEqual(0);
  });

  test("should apply correct class for color name", async () => {
    const element = await fixture(`<md-button color="color-none"></md-button>`);
    expect(element.shadowRoot!.querySelectorAll(".md-button--color-none").length).toEqual(1);
  });

  test("should render wrapped button if label passed", async () => {
    const element = await fixture(`<md-button label="buttonComponent" ariaLabel="buttonComponent"></md-button>`);
    expect(element.shadowRoot!.querySelectorAll(".md-button__container--small").length).toEqual(1);
    expect(element.shadowRoot!.querySelectorAll(".md-button__label").length).toEqual(1);
  });

  test("should render wrapped button in large container if label and containerLarge passed", async () => {
    const element = await fixture(`<md-button label="Button Component" containerLarge></md-button>`);
    expect(element.shadowRoot!.querySelectorAll(".md-button__container").length).toEqual(1);
  });

  test("should show active class when passed active prop", async () => {
    const element = await fixture(`<md-button label="Button Component" active></md-button>`);
    expect(element.shadowRoot!.querySelector(".md-button")!.classList).toContain("active");
  });

  test("should show type if passed one", async () => {
    const element = await fixture(`<md-button type="submit"></md-button>`);
    expect(element.getAttribute("type")).toEqual("submit");
  });

  test("should have tab-index attribute if defined", async () => {
    const element = await fixture<Button>(`<md-button tab-index="1"></md-button>`);
    expect(element.getAttribute("tab-index")).toEqual("1");

    const button = element.shadowRoot!.querySelector("button");
    expect(button!.getAttribute("tabindex")).toContain("1");
    expect(element.disabled).toBeFalsy();
  });

  test("should have tab-index of -1 if disabled", async () => {
    const element = await fixture<Button>(`<md-button tab-index="1" disabled></md-button>`);
    const button = element.shadowRoot!.querySelector("button");
    expect(button!.getAttribute("tabindex")).toContain("-1");
    expect(element.disabled).toBeTruthy();
  });
  test("should handle disabled state", async () => {
    const element = await fixture<Button>(`<md-button disabled></md-button>`);
    expect(element.disabled).toEqual(true);
  });

  test("should set width successfulyl", async () => {
    const customWidth = "260px";
    expect.hasAssertions();
    const element = await fixture<Button>(
      html`
        <md-button width=${customWidth}></md-button>
      `
    );
    expect(element.width).toEqual(customWidth);

    const styles = element["getStyles"]();
    const hasStyle = styles?.values.includes(`width: ${customWidth};`);
    expect(hasStyle).toBeTruthy();
  });

  test("should set maxWidth successfulyl", async () => {
    const customMaxWidth = "100px";
    expect.hasAssertions();
    const element = await fixture<Button>(
      html`
        <md-button maxWidth=${customMaxWidth}></md-button>
      `
    );
    expect(element.maxWidth).toEqual(customMaxWidth);

    const styles = element["getStyles"]();
    const hasStyle = styles?.values.includes(`max-width: ${customMaxWidth};`);
    expect(hasStyle).toBeTruthy();
  });

  describe.each(["button", "input", "a"])("should handle events for tag", (tag: string) => {
    afterEach(() => {
      fixtureCleanup();
      jest.restoreAllMocks();
    });
    test(`for ${tag}`, async () => {
      const element = await fixture<Button>(
        html`
          <md-button .tag=${tag as Button.Tag}></md-button>
        `
      );
      const spyKeyDown = jest.spyOn(element, "handleKeyDown");
      const spyClick = jest.spyOn(element, "handleClick");
      const tagElement = element.shadowRoot!.querySelector(`${tag}`);

      tagElement!.dispatchEvent(new MouseEvent("click"));
      tagElement!.dispatchEvent(new MouseEvent("click"));
      expect(spyClick).toHaveBeenCalledTimes(2);
      tagElement!.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: Key.Enter
        })
      );
      tagElement!.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: Key.Space
        })
      );
      tagElement!.dispatchEvent(
        new KeyboardEvent("keydown", {
          code: Key.Escape
        })
      );
      expect(spyKeyDown).toHaveBeenCalledTimes(3);
    });
  });

  test("should handle click event", async () => {
    jest.spyOn(Button.prototype, "blur");
    const element = await fixture<Button>(`<md-button label="Button Component"></md-button>`);
    const evt = new MouseEvent("click");
    setTimeout(() => element.handleClick(evt));
    const { detail } = await oneEvent(element, "button-click");
    expect(detail).toBeDefined();
    expect(detail.srcEvent.type).toBe("click");
  });

  describe("should handle property clickFunction", () => {
    let count = 0;
    const clickFunction = () => count++;
    test("should apply clickable class when onClick prop is defined", async () => {
      const el = await fixture<Button>(
        html`
          <md-button .clickFunction=${clickFunction}></md-button>
        `
      );
      expect(count).toEqual(0);
      setTimeout(() => el.handleClick(new MouseEvent("click")));
      const { detail } = await oneEvent(el, "button-click");
      expect(detail.srcEvent.type).toBe("click");
      expect(count).toEqual(1);
    });
    test.only("should not invoke passed in function when disabled", async () => {
      const clickFunc = jest.fn(() => {
        return;
      });

      const el = await fixture<Button>(
        html`
          <md-button title="Test Group" disabled .clickFunction=${clickFunc}></md-button>
        `
      );
      const spyKeyDown = jest.spyOn(el, "handleKeyDown");
      const spyClick = jest.spyOn(el, "handleClick");
      const mouseEvent = new MouseEvent("click");
      const keyEvent = new KeyboardEvent("keydown", { code: Key.Space });
      el.shadowRoot?.querySelector("button")?.dispatchEvent(mouseEvent);
      expect(spyClick).toHaveBeenCalled();
      expect(clickFunc).not.toHaveBeenCalled();
      el.shadowRoot?.querySelector("button")?.dispatchEvent(keyEvent);
      expect(spyKeyDown).toHaveBeenCalled();
      expect(clickFunc).not.toHaveBeenCalled();
    });
  });

  test("should handle keydown event", async () => {
    const element = await fixture<Button>(`<md-button label="Button Component"></md-button>`);
    const evt = new KeyboardEvent("keydown", {
      code: Key.Enter
    });
    setTimeout(() => element.handleKeyDown(evt));
    const { detail } = await oneEvent(element, "button-keydown");
    expect(detail).toBeDefined();
    expect(detail.srcEvent.type).toBe("keydown");
  });

  describe("test size propetry", () => {
    test("should apply correct class for default size", async () => {
      const buttonElement = await fixture(`<md-button label="Button Component"></md-button>`);
      const button = buttonElement.shadowRoot!.querySelector("button");
      expect(button!.getAttribute("class")).toContain("md-button--32");
    });

    test("should apply correct class for size none", async () => {
      const buttonElement = await fixture(`<md-button label="Button Component" size="none"></md-button>`);
      const button = buttonElement.shadowRoot!.querySelector("button");
      expect(button!.getAttribute("class")).toContain("md-button--none");
    });

    test("should apply correct class for size 28", async () => {
      const buttonElement = await fixture(`<md-button label="Button Component" size="28"></md-button>`);
      const button = buttonElement.shadowRoot!.querySelector("button");
      expect(button!.getAttribute("class")).toContain("md-button--28");
    });

    test("should apply correct class for size 40", async () => {
      const buttonElement = await fixture(`<md-button label="Button Component" size="40"></md-button>`);
      const button = buttonElement.shadowRoot!.querySelector("button");
      expect(button!.getAttribute("class")).toContain("md-button--40");
    });

    test("should apply correct class for size 52", async () => {
      const buttonElement = await fixture(`<md-button label="Button Component" size="52"></md-button>`);
      const button = buttonElement.shadowRoot!.querySelector("button");
      expect(button!.getAttribute("class")).toContain("md-button--52");
    });
  });
  test.each(["button", "input", "a"])("should apply correct status for aria-* attrubute", async (tag: string) => {
    const element = await fixture<Button>(
      html`
        <md-button
          .tag=${tag as Button.Tag}
          ariaPressed
          .ariaLabelledBy=${"true"}
          .ariaLabel=${"Button Aria Label"}
          disabled
        >
        </md-button>
      `
    );
    expect(element.ariaPressed).toBe(true);
    expect(element.ariaLabelledBy).toBe("true");
    expect(element.ariaLabel).toEqual("Button Aria Label");
  });

  test("should render nothing if correct tag is not provided", async () => {
    const buttonElement = await fixture(`<md-button label="Button Component" tag="p"></md-button>`);
    expect(buttonElement.shadowRoot!.querySelector("button")).toBeNull();
  });
});
