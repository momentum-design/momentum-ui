import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "../icon/Icon";
import "./AlertBanner";

export default {
  title: "AlertBanner",
  component: "md-alert-banner",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-alert-banner"
    }
  }
};

export const Default = () => {
  const type = select("type", ["default", "warning", "error"], "default");
  const closable = boolean("closable", false);
  const textContent = text("alert message", "Test Alert Message");

  return html`
    <p>A typical usage of Alert Banner, with text added within the element tags or message attribute</p>
    <md-alert-banner show type="${type}" ?closable=${closable} message="${textContent}">
      ${textContent ? `${textContent}` : `Text with slotted tag element`}
    </md-alert-banner>
  `;
};

