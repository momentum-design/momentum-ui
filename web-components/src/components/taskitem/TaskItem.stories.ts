import { withA11y } from "@storybook/addon-a11y";
import { number, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "../badge/Badge";
import "./TaskItem";

export default {
  title: "TaskItem",
  component: "md-task-item",
  decorators: [withKnobs, withA11y]
};

export const Default = () => {
  const title = text("Task Title", "Mihael Varificantare");
  const quantity = number("New Chat Quantity", 12);
  const mediaType = text("type", "voice");
  const status = text("status", "conference");
  const queue = text("queue text", "IRV_quelle_11");
  const message = text("Chat Message", "");
  const time = text("Timer", "00:00");

  return html`
    <md-task-item
      mediaType="${mediaType}"
      status="${status}"
      title="${title}"
      queue="${queue}"
      quantity="${quantity}"
      lastmessage="${message}"
    >
      <md-badge slot="task-type" color="darkmint" circle>
        <md-icon name="sms_16" color="white"></md-icon>
      </md-badge>
      <div slot="task-addition">${time}</div>
    </md-task-item>
  `;
};
