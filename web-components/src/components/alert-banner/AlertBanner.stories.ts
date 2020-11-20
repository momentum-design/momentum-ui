import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import { action } from '@storybook/addon-actions';
import "../icon/Icon";
import "./AlertBanner";
import "../theme/Theme";

export default {
  title: "AlertBanner",
  component: "md-alert-banner",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-alert-banner"
    },
    docs: { 
      description: { 
        component: 'A typical usage of Alert Banner, with text added within the element tags or message attribute' 
      },
    }
  }
};

export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const type = select("type", ["default", "warning", "error"], "default");
  const closable = boolean("closable", false);
  const textContent = text("alert message", "Test Alert Message");

  return html`
    <md-theme class="theme-toggle" id="alert-banner" ?darkTheme=${darkTheme}>
      <md-alert-banner @alertBanner-hide=${(action('dispatchEvent'))} show type="${type}" ?closable=${closable} message="${textContent}">
        ${textContent ? `${textContent}` : `Text with slotted tag element`}
      </md-alert-banner>
    </md-theme>
  `;
};

