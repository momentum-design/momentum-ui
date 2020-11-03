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

export const Type = () => {
  const type = select("type", ["default", "warning", "error"], "default");
  const closable = boolean("closable", false);
  const textContent = text("alert message", "Test Alert Message");

  return html`
    <p>A typical usage of Alert Banner, with text added within the element tags</p>
    <md-alert-banner show type="${type}" ?closable=${closable}>${textContent}</md-alert-banner>
  `;
};
export const MessageAttribute = () => {
  const type = select("type", ["default", "warning", "error"], "default");
  const closable = boolean("closable", false);
  const textContent = text("alert message", "Test Alert Message");

  return html`
    <p>Using Alert Banner, with text added within the message attribute</p>
    <md-alert-banner show type="${type}" ?closable=${closable} message=${textContent}></md-alert-banner>
  `;
};
