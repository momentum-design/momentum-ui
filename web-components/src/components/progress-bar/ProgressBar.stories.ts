import { withA11y } from "@storybook/addon-a11y";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import { BarFormat, BarType } from "../../utils/enums";
import "./ProgressBar";

export default {
  title: "Progress Bar",
  component: "md-progress-bar",
  decorators: [withKnobs, withA11y]
};

export const Default = () => {
  const color = text("color", "blue");
  const dynamic = boolean("dynamic", false);
  const defaultValue = "none";
  const label = "dispalyFormat";
  const format = select(label, BarFormat, defaultValue);
  const defaultType = "determinate";
  const labelType = "type";
  const type = select(labelType, BarType, defaultType);
  const value = number("Value", 25);

  return html`
    <md-progress-bar
      value=${value}
      type=${type}
      label="Test Progress Bar"
      color=${color}
      ?dynamic=${dynamic}
      displayFormat=${format}
    >
    </md-progress-bar>
  `;
};
