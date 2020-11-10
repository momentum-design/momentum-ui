import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import "@/components/avatar/Avatar";
import { nothing } from "lit-html";


@customElement("md-chat-message")
export class ChatMessage extends LitElement {
  @property({ type: String }) title = "";
  @property({ type: String }) src = "";
  @property({ type: String }) time = "";
  @property({ type: Boolean }) self = false;
  static get styles() {
    return [reset, styles];
  }

  render() {
    return html`
      <div class="md-chat-message">
        <md-avatar
          type="${this.self ? "self" : ""}"
          title=${this.self ? "self" : this.title}
          src=${this.self ? "" : this.src}
        ></md-avatar>

        <div class="md-chat-message_content">
          <div class="md-chat-message_heading">
            <div class="md-chat-message_title">
              <span>${this.self ? "You" : this.title}</span>
            </div>
            <div class="md-chat-message_time">
              ${this.time}
            </div>
          </div>
          <div class="md-chat-message_text">
            <slot name="message"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-chat-message": ChatMessage;
  }
}
