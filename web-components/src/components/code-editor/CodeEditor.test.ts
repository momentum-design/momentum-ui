import "./CodeEditor";
import { CodeEditor } from "./CodeEditor";
import { fixture, fixtureCleanup, elementUpdated } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import { Button } from "@/components/button/Button";

describe("CodeEditor component", () => {
  let element: CodeEditor;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<CodeEditor>(
      html`
        <md-code-editor></md-code-editor>
      `
    );
  });

  test("should render code editor", async () => {
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
    const mdButton = element.shadowRoot!.querySelector(".md-code-editor-file-btn") as Button;
    const button = mdButton.shadowRoot!.querySelector("button");

    button!.click();
    element.input.dispatchEvent(new Event("change"));
    await elementUpdated(element);

    expect(element["disableCopyButton"]).toBeTruthy();
    expect(element["copied"]).toBeFalsy();
  });

  test("", async () => {
    const element = await fixture<CodeEditor>(
      html`
        <md-code-editor>
          <code class="javascript" slot="code-block">
            Lorem ipsum dolor sit amet.
          </code>
        </md-code-editor>
      `
    );
    await elementUpdated(element);
    expect(element["disableCopyButton"]).toBeFalsy();
  });

  test("should copy to clipboard", async () => {
    const element = await fixture<CodeEditor>(
      html`
        <md-code-editor>
          <code class="javascript" slot="code-block">
            Lorem ipsum dolor sit amet.
          </code>
        </md-code-editor>
      `
    );
    await elementUpdated(element);

    const mdButton = element.shadowRoot!.querySelector(".md-code-editor-copy-btn") as Button;
    const button = mdButton.shadowRoot!.querySelector("button");

    document.execCommand = jest.fn();

    button!.click();

    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});
