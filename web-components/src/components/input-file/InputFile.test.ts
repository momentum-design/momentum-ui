import "./InputFile";
import { InputFile } from "./InputFile";
import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import { html } from "lit-element";

describe("InputFile component", () => {
  let element: InputFile;

  afterEach(fixtureCleanup);

  beforeEach(async () => {
    element = await fixture<InputFile>(
      html`
        <md-input-file></md-input-file>
      `
    );
  });

  test("should render input file", async () => {
    expect(element).toBeDefined();
  });
});
