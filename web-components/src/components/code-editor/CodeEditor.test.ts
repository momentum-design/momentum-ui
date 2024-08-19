import { Button } from "@/index";
import { elementUpdated, fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";
import "./CodeEditor";
import { CodeEditor } from "./CodeEditor";
// import { Button } from "../button/Button"; // Keep type import as a relative path

describe("CodeEditor component", () => {
  let element: CodeEditor.ELEMENT;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<CodeEditor.ELEMENT>(html`
      <md-code-editor>
        <span slot="method">post</span>
        <span slot="code-url">v1/contactCenter/agents/statistics</span>
        <code class="javascript" slot="code-block">
          module.exports = { presets: [["@babel/preset-env", { targets: { node: "current" } }]] };
        </code>
      </md-code-editor>
    `);
  });

  test("should render code editor", async () => {
    expect(element).toBeDefined();
  });

  test("", async () => {
    await elementUpdated(element);
    expect(element["disableCopyButton"]).toBeFalsy();
  });

  test("should copy to clipboard", async () => {
    await elementUpdated(element);

    const mdButton = element.shadowRoot!.querySelector(".md-code-editor-copy-btn") as Button.ELEMENT;
    const button = mdButton.shadowRoot!.querySelector("button");

    document.execCommand = jest.fn();

    button!.click();

    expect(document.execCommand).toHaveBeenCalledWith("copy");
  });
});
