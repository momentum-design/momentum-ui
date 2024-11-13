/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export namespace TaskItem {
  @customElementWithCheck("md-task-item")
  export class ELEMENT extends LitElement {
    @property({ type: String }) mediaType = "call";
    @property({ type: String }) status = "";
    @property({ type: String }) popovertitle = "";
    @property({ type: String }) queue = "";
    @property({ type: Boolean }) accepted = false;
    @property({ type: Number }) quantity = 0;
    @property({ type: String }) lastmessage = "";
    @property({ type: Boolean }) selected = false;
    @property({ type: String }) customAriaLabel = "";
    @property({ type: String }) iconSrc = "";
    @property({ type: String }) tabIndexForContainer = "0";

    /**
    * @deprecated Use `itemTitle` instead.
    * Using title will may cause an unwanted tooltip.
    */
    @property({ type: String, reflect: true })
    get title(): string {
      return this.displayTitle;
    }
    set title(title: string) {
      this.updateTitle(title);
    }
    /**
    * The visible text for the Title.
    */
    @property({ type: String, reflect: true })
    get itemTitle() {
      return this.displayTitle;
    }
    set itemTitle(itemTitle: string) {
      this.updateTitle(itemTitle);
    }

    private updateTitle(title: string) {
      this.displayTitle = title;
    }

    private displayTitle = "";

    renderTaskType = () => {
      switch (this.mediaType.toLowerCase()) {
        case "telephony":
          return html`
            <md-badge color="green" circle>
              <md-icon name="handset-filled" size="20" iconSet="momentumDesign"></md-icon>
            </md-badge>
          `;
        case "outbound telephony":
          return html`
            <md-badge color="green" circle>
              <md-icon name="outgoing-call-legacy-filled" size="20" iconSet="momentumDesign"></md-icon>
            </md-badge>
          `;
        case "inbound telephony":
          return html`
            <md-badge color="green" circle>
              <md-icon name="incoming-call-legacy-filled" size="20" iconSet="momentumDesign"></md-icon>
            </md-badge>
          `;
        case "applemessages":
        case "midcall telephony":
        case "icon src":
          return html`
            <md-badge circle>
              <img src="${this.iconSrc}" />
            </md-badge>
          `;
        case "callback":
          return html`
            <md-badge color="lime" circle>
              <md-icon name="icon-icon-callback_18"></md-icon>
            </md-badge>
          `;
        case "progressive_campaign":
          return html`
            <md-badge color="green" circle>
              <md-icon name="icon-icon-campaign_18"></md-icon>
            </md-badge>
          `;
        case "chat":
          return html`
            <md-badge color="blue" circle>
              <md-icon name="chat-filled" size="20" iconSet="momentumDesign"></md-icon>
            </md-badge>
          `;
        case "email":
          return html`
            <md-badge color="violet" circle>
              <md-icon name="email-filled" size="20" iconSet="momentumDesign"></md-icon>
            </md-badge>
          `;
        case "sms":
          return html`
            <md-badge color="darkmint" circle>
              <md-icon name="social-sms" size="20" iconSet="momentumDesign" color="white-100"></md-icon>
            </md-badge>
          `;
        case "facebook":
          return html`
            <md-badge bgColor="#0078FF" circle>
              <md-icon name="social-fbmessenger" size="20" iconSet="momentumDesign" color="white-100"></md-icon>
            </md-badge>
          `;
        case "whatsapp":
          return html`
            <md-badge bgColor="#25D366" circle>
              <md-icon name="social-whatsapp" size="20" iconSet="momentumDesign" color="white-100"></md-icon>
            </md-badge>
          `;
        default:
          return html` <slot name="task-type"></slot> `;
      }
    };

    renderStatus = () => {
      switch (this.status) {
        case "consulting":
          return html` <md-icon name="headset-bold" size="12" iconSet="momentumDesign"></md-icon> `;
        case "play":
          return html` <md-icon name="play-bold" size="12" iconSet="momentumDesign"></md-icon> `;
        case "hold":
          return html` <md-icon name="pause-bold" size="12" iconSet="momentumDesign"></md-icon> `;
        case "conference":
          return html` <md-icon name="meet-bold" size="16" iconSet="momentumDesign"></md-icon> `;
        case "transfered":
          return html` <md-icon name="assign-privilege-bold" size="16" iconSet="momentumDesign"></md-icon> `;
        case "courtesy_callback":
          return html` <md-icon name="callrate-bold" size="12" iconSet="momentumDesign"></md-icon> `;
        case "campaign":
          return html` <md-icon name="announcement-bold" size="12" iconSet="momentumDesign"></md-icon> `;
        default:
          return html` <slot name="task-status"></slot> `;
      }
    };

    handleClick(event: MouseEvent) {
      this.dispatchEvent(
        new CustomEvent("taskitem-click", {
          composed: true,
          bubbles: true,
          detail: {
            srcEvent: event
          }
        })
      );
      this.blur();
    }

    handleKeyDown(event: KeyboardEvent) {
      this.dispatchEvent(
        new CustomEvent("taskitem-keydown", {
          detail: {
            key: event.code
          },
          bubbles: true,
          composed: true
        })
      );
    }

    renderChatCount() {
      return this.quantity > 0
        ? this.quantity > 99
          ? html` <span class="new-chat-quantity">99+</span> `
          : html` <span class="new-chat-quantity">${this.quantity}</span> `
        : nothing;
    }

    getAriaLabel() {
      if (this.customAriaLabel) {
        return this.customAriaLabel;
      }
      let queueContent = this.queue;

      if (!queueContent) {
        const queueSlot = this.querySelector('[slot="queue"]') as HTMLElement;
        if (queueSlot) {
          queueContent = queueSlot.textContent?.trim() || queueSlot.innerText.trim();
          const timeMatch = queueContent.match(/(?:([01]?\d|2[0-3]):)?([0-5]?\d):([0-5]?\d)/);

          if (timeMatch) {
            const [, hours = 0, minutes, seconds] = timeMatch.map(Number);

            // Create a Date object from the time
            const date = new Date();
            date.setHours(hours, minutes, seconds);

            // Format the new time and add it back to the queueContent string
            queueContent = queueContent.replace(
              /(?:([01]?\d|2[0-3]):)?([0-5]?\d):([0-5]?\d)/,
              `${hours ? hours + " hours " : ""}${minutes} minutes ${seconds} seconds`
            );
          }
        }
      }
      return `${this.mediaType} ${this.status} ${this.title} ${queueContent} ${this.quantity ? this.quantity : ""} ${
        this.lastmessage
      }`;
    }

    static get styles() {
      return [reset, styles];
    }

    private get sanitizedTabIndexForContainer() {
      return parseInt(this.tabIndexForContainer) ?? 0;
    }

    render() {
      return html`
        <div
          part="task-item-container"
          class="md-taskitem ${classMap({ selected: this.selected })}"
          tabindex=${this.sanitizedTabIndexForContainer}
          aria-selected="${this.selected}"
          @click=${(e: MouseEvent) => this.handleClick(e)}
          @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e)}
          aria-label=${this.getAriaLabel()}
        >
          <div class="md-taskitem__mediatype">
            ${this.renderTaskType()}
            ${this.status
              ? html` <span class=${`md-taskitem__status ` + `${this.status}`}> ${this.renderStatus()} </span> `
              : nothing}
          </div>
          <div class="md-taskitem__content" part="task-item-content">
          ${this.popovertitle
              ? html` <span class="md-taskitem__content_popover_title">${this.popovertitle}</span> `
              : nothing}
            ${this.title
              ? html`
                  <span class="md-taskitem__content_title ${classMap({ mainTitle: !this.popovertitle })}"
                    >${this.title}</span
                  >
                `
              : nothing}
            <div class="md-taskitem__content_inner">
              <span class="md-taskitem__content_queue">
                ${this.queue.length > 0 ? this.queue : html` <slot name="queue"></slot> `}
              </span>
            </div>
            ${this.lastmessage
              ? html`
                  <span class="md-taskitem__content_chat">
                    <span class="new-chat_massages">${this.lastmessage}</span>
                  </span>
                `
              : nothing}
          </div>
          <div class="md-taskitem__addition">
            <slot></slot>
            ${this.renderChatCount()}
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-task-item": TaskItem.ELEMENT;
  }
}
