import { Key } from "@/constants";
import { elementUpdated, fixture, fixtureCleanup, nextFrame, oneEvent } from "@open-wc/testing-helpers";
import { html } from "lit";
import "./Slider";
import { Slider } from "./Slider";

describe("Slider Component", () => {
  let element: Slider.ELEMENT;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<Slider.ELEMENT>(html` <md-slider></md-slider> `);
  });

  test("should handle click event", async () => {
    element.dispatchEvent(new KeyboardEvent("mousedown"));

    await elementUpdated(element);
    expect(element["dragging"]).toBeTruthy();
    expect(document.activeElement).toEqual(element);

    document.dispatchEvent(new MouseEvent("mouseup"));

    await nextFrame();
    expect(element["dragging"]).toBeFalsy();

    setTimeout(() => element["notifyChanges"]());

    const { detail } = await oneEvent(element, "slider-change");
    expect(detail).toBeDefined();

    element.disabled = true;
    await elementUpdated(element);

    element.dispatchEvent(new KeyboardEvent("mousedown"));
    await elementUpdated(element);

    await nextFrame();
    expect(element["dragging"]).toBeFalsy();
  });

  test("should handle keyboard event", async () => {
    const createEvent = (code: string) =>
      new KeyboardEvent("keydown", {
        code
      });

    element.dispatchEvent(createEvent(Key.ArrowLeft));
    await elementUpdated(element);

    expect(element.now).toEqual(0);

    element.dispatchEvent(createEvent(Key.ArrowLeft));
    await elementUpdated(element);

    expect(element.now).toEqual(0);

    element.dispatchEvent(createEvent(Key.ArrowRight));
    await elementUpdated(element);

    expect(element.now).toEqual(1);

    element.dispatchEvent(createEvent(Key.ArrowUp));
    await elementUpdated(element);

    expect(element.now).toEqual(2);

    element.now = 100;

    await elementUpdated(element);

    element.dispatchEvent(createEvent(Key.ArrowUp));
    await elementUpdated(element);

    expect(element.now).toEqual(100);

    element.dispatchEvent(createEvent(Key.Home));
    await elementUpdated(element);

    expect(element.now).toEqual(0);

    element.dispatchEvent(createEvent(Key.End));
    await elementUpdated(element);

    expect(element.now).toEqual(100);

    element.dispatchEvent(createEvent("KeyA"));
    await elementUpdated(element);

    expect(element.now).toEqual(100);

    document.dispatchEvent(new KeyboardEvent("keyup"));

    setTimeout(() => element["notifyChanges"]());

    const { detail } = await oneEvent(element, "slider-change");
    expect(detail).toBeDefined();
  });

  test("should set disabled", async () => {
    expect(element.tabIndex).toEqual(0);

    element.disabled = true;
    await elementUpdated(element);

    expect(element.tabIndex).toEqual(-1);
    expect(element.getAttribute("aria-disabled")).toEqual("true");

    element.disabled = false;
    await elementUpdated(element);

    expect(element.tabIndex).toEqual(0);
    expect(element.getAttribute("aria-disabled")).toEqual("false");
  });

  test("should render steps", async () => {
    element.step = 20;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelectorAll(".tick").length).toEqual(6);

    element.step = 15;
    await elementUpdated(element);

    expect(element.shadowRoot!.querySelectorAll(".tick").length).toEqual(7);
  });
});
