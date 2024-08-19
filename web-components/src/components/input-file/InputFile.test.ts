import { Button } from "@/components/button/Button";
import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import "./InputFile";
import { InputFile } from "./InputFile";

describe("InputFile component", () => {
  let element: InputFile.ELEMENT;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<InputFile.ELEMENT>(html` <md-input-file></md-input-file> `);
  });

  test("should render input file", async () => {
    expect(element).toBeDefined();
  });

  test("should check acceptable lang", async () => {
    element.acceptLanguage = "Jabascript";

    const spyWarn = jest.spyOn(console, "warn");

    await elementUpdated(element);

    expect(spyWarn).toHaveBeenCalledWith("Please set correct language name");
    spyWarn.mockRestore();
  });

  test("should trigger input click", async () => {
    const mdButton = element.shadowRoot!.querySelector(".md-input-file-btn") as Button.ELEMENT;
    const button = mdButton.shadowRoot!.querySelector("button");

    button!.click();
    element.input.dispatchEvent(new Event("change"));
    await elementUpdated(element);
  });
});
