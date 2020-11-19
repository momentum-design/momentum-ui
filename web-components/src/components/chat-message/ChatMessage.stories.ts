import { withA11y } from "@storybook/addon-a11y";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./ChatMessage";

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
  const title = text("title", "John Doe");
  const message = text("message", "I have issue with my silencer");
  const selfMode = boolean("Self", false);

  return html`
    <md-chat-message .self=${selfMode} title=${title} time="11:27AM">
      <p slot="message">${message}</p>
    </md-chat-message>
  `;
};
