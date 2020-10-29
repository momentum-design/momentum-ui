import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "./ActivityButton";
import { activityButtonSize, activityButtonType } from "./ActivityButton";

export default {
  title: "Activity Button",
  component: "md-activity-button",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-activity-button"
    }
  }
};

export const Default = () =>
  html`
    <md-activity-button .type=${"chat"}></md-activity-button>
  `;

export const Size = () => {
  const label = "Size";
  const defaultValue = 68;
  const size = select(label, activityButtonSize, defaultValue);

  return html`
    <md-activity-button .type=${"chat"} .size=${size}></md-activity-button>
  `;
};

export const Type = () => {
  const label = "Type";
  const defaultValue = "meetings";
  const type = select(label, activityButtonType, defaultValue);

  return html`
    <md-activity-button .type=${type}></md-activity-button>
  `;
};

export const Disabled = () => {
  const label = "Disabled";
  const defaultValue = true;
  const disabled = boolean(label, defaultValue);

  return html`
    <md-activity-button .type=${"chat"} ?disabled=${disabled}></md-activity-button>
  `;
};

export const Label = () => {
  const label = text("Title", "Webex Teams");
  return html`
    <md-activity-button .type=${"chat"} .label=${label}> </md-activity-button>
  `;
};
