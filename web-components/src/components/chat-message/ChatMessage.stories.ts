import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./ChatMessage";
import "../theme/Theme";

export default {
  title: "ChatMessage",
  component: "md-chat-message",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-chat-message"
    }
  }
};

export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const title = text("title", "John Doe");
  const message = text("message", "I have issue with my silencer");
  const selfMode = boolean("Self", false);

  return html`
  <md-theme class="theme-toggle" id="button" ?darkTheme=${darkTheme}>
    <md-chat-message .self=${selfMode} title=${title} time="11:27AM">
      <p slot="message">${message}</p>
    </md-chat-message>
  </md-theme>
  `;
};
