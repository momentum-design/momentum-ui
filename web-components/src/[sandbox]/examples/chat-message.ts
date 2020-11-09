import "@/components/chat-message/ChatMessage";
import { html } from "lit-element";

export const chatMessageTemplate = html`
  <md-chat-message .title="John Doe">
    <p slot="message">I have issue with my silencer</p>
  </md-chat-message>
`;
