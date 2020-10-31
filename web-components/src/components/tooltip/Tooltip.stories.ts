import { withA11y } from "@storybook/addon-a11y";
import { select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "../button/Button";
import "./Tooltip";
import { tooltipPlacement } from "./Tooltip";

export default {
  title: "Tooltip",
  component: "md-tooltip",
  decorators: [withKnobs, withA11y]
};

export const Default = () => {
  const message = text("message", "Test tooltip");
  const placement = select("placement", tooltipPlacement, "bottom");

  return html`
    <md-tooltip message=${message} placement=${placement}>
      <md-button>Test Button</md-button>
    </md-tooltip>
  `;
};
