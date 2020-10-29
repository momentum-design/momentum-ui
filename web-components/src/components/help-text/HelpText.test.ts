import { fixture, fixtureCleanup } from "@open-wc/testing-helpers";
import "./HelpText";
import { HelpText } from "./HelpText";

describe("TextHelper component", () => {
  afterEach(() => {
    fixtureCleanup();
  });

  test("should render one help text", async () => {
    const element = await fixture(`<md-help-text></md-help-text>`);
    expect(element).not.toBeNull();
  });

  test("should create message help text", async () => {
    const element = await fixture<HelpText>(`<md-help-text message="test message"></md-help-text>`);
    expect(element.message).toMatch("test message");
    expect(element.getAttribute("message")).toMatch("test message");
  });
});
