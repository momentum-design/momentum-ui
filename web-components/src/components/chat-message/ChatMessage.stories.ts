/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/chat-message/ChatMessage";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit";

export default {
  title: "Components/Chat Message",
  component: "md-chat-message",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-chat-message"
    }
  }
};

export const ChatMessage = () => {
  const darkTheme = boolean("Dark Theme", false);
  const lumos = boolean("Lumos Theme", false);
  const title = text("title", "John Doe");
  const message = text("message", "I have issue with my silencer");
  const selfMode = boolean("Self", false);

  return html`
    <md-theme class="theme-toggle" id="chat" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-chat-message .self=${selfMode} title=${title} time="11:27AM">
        <p slot="message">${message}</p>
      </md-chat-message>
    </md-theme>
  `;
};
