import "./FloatingModal";
import { FloatingModal } from "./FloatingModal";
import { elementUpdated, fixture, fixtureCleanup, html, nextFrame } from "@open-wc/testing-helpers";

describe("Modal Component", () => {
  let element: FloatingModal;

  beforeEach(async () => {
    element = await fixture<FloatingModal>(
      html`
        <md-floating-modal>
          <p slot="header">Test inner slotted text</p>
        </md-floating-modal>
      `
    );
  });
  afterEach(fixtureCleanup);

  test("should display element if dialog open", async () => {
    jest.useFakeTimers();
    element.show = true;
    await elementUpdated(element);
    await nextFrame();
    expect(element).toBeDefined;
    const headerText = element.shadowRoot?.querySelector(".md-floating__header-text slot");
    expect(headerText).not.toBeDefined;
  });

  test("should display element without header slot", async () => {
    jest.useFakeTimers();
    element.show = true;
    element.heading = "Test";
    await elementUpdated(element);
    await nextFrame();
    const headerText = element.shadowRoot?.querySelector(".md-floating__header-text");
    expect(headerText?.innerHTML).toContain("Test");
  });

  test("should resize element by top button", async () => {
    jest.useFakeTimers();
    element.show = true;
    await elementUpdated(element);
    await nextFrame();
    const maxBtn = element.shadowRoot?.querySelector("md-button.md-floating__resize");
    const minBtn = element.shadowRoot?.querySelector("md-button.md-floating__resized");
    expect(maxBtn).toBeDefined;
    element.onResize();
    await elementUpdated(element);
    await nextFrame();
    expect(element.fullScreen).toBeTruthy;
    expect(minBtn).toBeDefined;
  });

  test("should close element by button", async () => {
    jest.useFakeTimers();
    element.show = true;
    await elementUpdated(element);
    await nextFrame();
    const closeBtn = element.shadowRoot?.querySelector("md-button.md-floating__close");
    expect(closeBtn).toBeDefined;
    element.close();
    await elementUpdated(element);
    await nextFrame();
    expect(element.show).toBeFalsy;
  });

  test("should call onWindowPress", async () => {
    element.show = true;
    await elementUpdated(element);
    await nextFrame();

    const mockWindowPress = jest.spyOn(element, "onWindowPress");
    element.onWindowPress(new MouseEvent("press"));
    await elementUpdated(element);

    expect(mockWindowPress).toHaveBeenCalled();
    expect(element.draggingWindow).toBeTruthy;
    mockWindowPress.mockRestore();
  });

  test("should call onWindowDrag", async () => {
    element.show = true;
    await elementUpdated(element);
    await nextFrame();

    const mockWindowDrag = jest.spyOn(element, "onWindowDrag");
    element.onWindowDrag(new MouseEvent("move"));
    await elementUpdated(element);

    expect(mockWindowDrag).toHaveBeenCalled();
    element.draggingWindow = true;
    await elementUpdated(element);

    element.onWindowDrag(new MouseEvent("move"));
    await elementUpdated(element);
    expect(mockWindowDrag).toHaveBeenCalled();
    expect(element.x).toEqual(300);

    mockWindowDrag.mockRestore();
  });

  test("should call onCornerRelease", async () => {
    element.show = true;
    element.draggingWindow = true;
    element.draggingCorner = true;
    await elementUpdated(element);
    await nextFrame();

    const mockCornerRelease = jest.spyOn(element, "onCornerRelease");
    element.onCornerRelease(new MouseEvent("move"));
    await elementUpdated(element);

    expect(mockCornerRelease).toHaveBeenCalled();
    await elementUpdated(element);

    expect(mockCornerRelease).toHaveBeenCalled();
    expect(element.draggingWindow).toBeFalsy;
    expect(element.draggingCorner).toBeFalsy;

    mockCornerRelease.mockRestore();
  });

  test("should call onCornerClick", async () => {
    element.show = true;
    element.draggingWindow = true;
    await elementUpdated(element);
    await nextFrame();

    const mockCornerClick = jest.spyOn(element, "onCornerClick");
    element.onCornerClick(new MouseEvent("click"), element.topLeftResize);
    await elementUpdated(element);

    expect(mockCornerClick).toHaveBeenCalled();
    await elementUpdated(element);

    expect(mockCornerClick).toHaveBeenCalled();
    expect(element.draggingWindow).toBeFalsy;
    expect(element.draggingCorner).toBeTruthy;

    mockCornerClick.mockRestore();
  });

  test("should call onCornerMove", async () => {
    element.show = true;
    await elementUpdated(element);
    await nextFrame();

    const mockCornerMove = jest.spyOn(element, "onCornerMove");
    element.onCornerMove(new MouseEvent("move"));
    await elementUpdated(element);

    expect(mockCornerMove).toHaveBeenCalled();
    mockCornerMove.mockRestore();
  });

  test("should call Resize functions", async () => {
    element.show = true;
    await elementUpdated(element);
    await nextFrame();

    const mockLeftMove = jest.spyOn(element, "topLeftResize");
    const mockLeftBottomMove = jest.spyOn(element, "bottomLeftResize");
    const mockRightMove = jest.spyOn(element, "topRightResize");
    const mockRightBottomMove = jest.spyOn(element, "bottomRightResize");

    element.topLeftResize(400, 400);
    await elementUpdated(element);
    expect(mockLeftMove).toHaveBeenCalled();

    element.bottomLeftResize(400, 400);
    await elementUpdated(element);
    expect(mockLeftBottomMove).toHaveBeenCalled();

    element.topRightResize(400, 400);
    await elementUpdated(element);
    expect(mockRightMove).toHaveBeenCalled();

    element.bottomRightResize(400, 400);
    await elementUpdated(element);
    expect(mockRightBottomMove).toHaveBeenCalled();

    mockLeftMove.mockRestore();
    mockLeftBottomMove.mockRestore();
    mockRightMove.mockRestore();
    mockRightBottomMove.mockRestore();
  });
});
