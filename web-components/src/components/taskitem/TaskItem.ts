/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/avatar/Avatar";
import "@/components/badge/Badge";
import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { TaskItemStatus, TaskItemMediaType } from "./TaskItem.constants";
import { TaskItemUtils } from "./TaskItem.utils";
import styles from "./scss/module.scss";
import { ifDefined } from "lit-html/directives/if-defined";

export namespace TaskItem {
  export type TaskItemStatus = (typeof TaskItemStatus)[keyof typeof TaskItemStatus];
  export type TaskItemMediaType = (typeof TaskItemMediaType)[keyof typeof TaskItemMediaType];
  @customElementWithCheck("md-task-item")
  export class ELEMENT extends LitElement {
    @property({ type: String }) mediaType: TaskItemMediaType | string = TaskItemMediaType.TELEPHONY;
    @property({ type: String }) status: TaskItemStatus | string = "";
    @property({ type: String }) popovertitle = "";
    @property({ type: String }) queue = "";
    @property({ type: String, attribute: "queue-time" }) queueTime = "";
    @property({ type: Boolean }) accepted = false;
    @property({ type: Boolean, attribute: "display-only-title" }) displayOnlyTitle = false;
    @property({ type: Number }) quantity = 0;
    @property({ type: String }) lastmessage = "";
    @property({ type: Boolean }) selected = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) customAriaLabel = "";
    @property({ type: String }) iconSrc = "";
    @property({ type: String }) tabIndexForContainer = "0";
    @property({ type: Boolean, attribute: "is-restyle" })
    isRestyle = false;

    /**
     * @deprecated Use `itemTitle` instead.
     * Using title may cause an unwanted tooltip.
     */
    @property({ type: String, reflect: true })
    get title(): string {
      return this.displayTitle;
    }
    set title(title: string) {
      this.titleValue = title;
      this.updateTitle();
    }
    /**
     * The visible text for the Title.
     */
    @property({ type: String, reflect: true, attribute: "item-title" })
    get itemTitle() {
      return this.displayTitle;
    }
    set itemTitle(itemTitle: string) {
      this.itemTitleValue = itemTitle;
      this.updateTitle();
    }

    private updateTitle() {
      if (!this.itemTitleValue) {
        this.displayTitle = this.titleValue;
      } else {
        this.displayTitle = this.itemTitleValue;
      }
    }

    private displayTitle = "";
    private titleValue = "";
    private itemTitleValue = "";
    private utils: TaskItemUtils;

    constructor() {
      super();
      this.utils = new TaskItemUtils(this);
    }

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

    getAriaLabel() {
      if (this.customAriaLabel) {
        return this.customAriaLabel;
      }
      let queueContent = this.queue;

      if (!queueContent) {
        const queueSlot = this.querySelector('[slot="queue"]') as HTMLElement;
        if (queueSlot) {
          queueContent = queueSlot.textContent?.trim() ?? queueSlot.innerText.trim();
          const timeRegex = /(?:([01]?\d|2[0-3]):)?([0-5]?\d):([0-5]?\d)/;
          const timeMatch = timeRegex.exec(queueContent);

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

    private handleAdditionSlotChange() {
      const container = this.shadowRoot?.querySelector(".md-taskitem__addition") as HTMLDivElement;

      if (container) {
        const rect = container.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
          container.style.margin = "0px";
        }
      }
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
          aria-disabled=${ifDefined(this.disabled || undefined)}
        >
          <div class="md-taskitem__mediatype">
            ${this.utils.taskTypeTemplate}
            ${this.status && !this.isRestyle
              ? html` <span class=${`md-taskitem__status ` + `${this.status}`}> ${this.utils.renderStatus()} </span> `
              : nothing}
          </div>
          <div class="md-taskitem__content" part="task-item-content">
            ${this.popovertitle
              ? html` <span class="md-taskitem__content_popover_title">${this.popovertitle}</span> `
              : nothing}
            ${this.title
              ? html`
                  <span
                    class="md-taskitem__content_title ${classMap({
                      mainTitle: !this.popovertitle,
                      "display-only-title": this.displayOnlyTitle
                    })}"
                    >${this.title}</span
                  >
                `
              : html` <span class="md-taskitem__content_popover_title"><slot name="title"></slot></span> `}
            <div class="md-taskitem__content_inner">
              <span class="md-taskitem__content_queue">
                ${this.queue.length > 0 ? this.queue : html` <slot name="queue"></slot> `}
                ${this.queueTime
                  ? html`<div class="md-taskitem__content_queue_dot"></div>
                      ${this.queueTime}`
                  : nothing}
              </span>
            </div>
            ${this.lastmessage
              ? html`
                  <span class="md-taskitem__content_chat">
                    <span class="new-chat_massages">${this.lastmessage}</span>
                  </span>
                `
              : nothing}
            ${!this.lastmessage ? html` <slot name="lastmessage"></slot> ` : nothing}
          </div>
          <div class="md-taskitem__addition">
            <slot @slotchange="${this.handleAdditionSlotChange}"></slot>
            ${this.utils.renderChatCount()}
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
