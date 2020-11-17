import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "./ActivityButton";
import { activityButtonSize, activityButtonType } from "./ActivityButton";
import { withCssResources } from '@storybook/addon-cssresources';

export default {
  title: "Activity Button",
  component: "md-activity-button",
  decorators: [withKnobs, withA11y, withCssResources],
  parameters: {
    a11y: {
      element: "md-activity-button"
    },
    cssresources: [
      {
        id: `lighttheme`,
        code: `<style>body { background-color: white; }</style>`,
        picked: false,
        hideCode: false, // Defaults to false, this enables you to hide the code snippet and only displays the style selector
      },
      {
        id: `darktheme`,
        code: `<style>body { background-color: black; }</style>`,
        picked: false,
        hideCode: false, // Defaults to false, this enables you to hide the code snippet and only displays the style selector
      }
    ],
  }
};

export const Default = () => {
  const label = text("Title", "");
  const labelSize = "Size";
  const defaultValue = 68;
  const size = select(labelSize, activityButtonSize, defaultValue);
  const labelType = "Type";
  const defaultTypeValue = "meetings";
  const type = select(labelType, activityButtonType, defaultTypeValue);
  const disabled = boolean("Disabled", false);

  return html`
    <md-activity-button .label="${label}" .type="${type}" .size="${size}" ?disabled="${disabled}"></md-activity-button>
  `;
}