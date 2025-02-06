import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import "@/components/avatar/Avatar";
import { ifDefined } from "lit-html/directives/if-defined";

export const statusType = ["Delivered", "Failed", "Read", "Seen", "Sent", ""] as const;

export namespace ChatMessage {
  @customElementWithCheck("md-chat-message")
  export class ELEMENT extends LitElement {
    @property({ type: String }) title = "";
    @property({ type: String }) src = "";
    @property({ type: String }) time = "";
    @property({ type: String }) label = "Avatar";
    @property({ type: Boolean }) self = false;
    @property({ type: String }) status: (typeof statusType)[number] = "";

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-chat-message">
          <md-avatar
            type=${ifDefined(this.self ? "self" : undefined)}
            title=${this.self ? "self" : this.title}
            label="${this.label}"
            src=${ifDefined(this.self ? undefined : this.src)}
          ></md-avatar>

          <div class="md-chat-message_content">
            <div class="md-chat-message_heading">
              <div class="md-chat-message_title">
                <span>${this.self ? "You" : this.title}</span>
              </div>
              <div class="md-chat-message_time">${this.time}</div>
              <div class="md-chat-message_status">${this.status}</div>
            </div>
            <div class="md-chat-message_text">
              <slot name="message"></slot>
            </div>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-chat-message": ChatMessage.ELEMENT;
  }
}
