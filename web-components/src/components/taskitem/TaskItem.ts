/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "../avatar/Avatar";
import "../badge/Badge";
import "../icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { TaskItemMediaType, TaskItemStatus } from "./TaskItem.constants";
import { getTaskTypeTemplate, renderChatCount, renderStatus } from "./TaskItem.utils";
import styles from "./scss/module.scss";

export namespace TaskItem {
  export type TaskItemStatus = (typeof TaskItemStatus)[keyof typeof TaskItemStatus];
  export type TaskItemMediaType = (typeof TaskItemMediaType)[keyof typeof TaskItemMediaType];
  @customElementWithCheck("md-task-item")
  export class ELEMENT extends LitElement {
    @property({ type: String }) mediaType: TaskItemMediaType | string = TaskItemMediaType.TELEPHONY;
    @property({ type: String }) status: TaskItemStatus | string = "";
    @property({ type: String }) popovertitle = "";
    @property({ type: String }) queue = "";
    @property({ type: String, attribute: "queue-time-label" }) queueTimeLabel = "";
    @property({ type: Boolean }) accepted = false;
    @property({ type: Boolean, attribute: "display-only-title" }) displayOnlyTitle = false;
    @property({ type: Number }) quantity = 0;
    @property({ type: String }) lastmessage = "";
    @property({ type: Boolean }) selected = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: String }) customAriaLabel = "";
    @property({ type: String }) iconSrc = "";
    @property({ type: String }) tabIndexForContainer = "0";
    @property({ type: Boolean, attribute: "is-restyle" }) isRestyle = false;

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
    @state() private additionEmptyMargin: boolean = false;

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
      const queueTimeSlot = this.querySelector('[slot="queue-time"]') as HTMLElement;
      let queueTimeContent = this.queueTimeLabel;
      if (queueTimeSlot) {
        queueTimeContent += `${queueTimeSlot.textContent?.trim() ?? queueTimeSlot.innerText.trim()}`;
      }

      return `${this.mediaType} ${this.status} ${this.popovertitle} ${this.itemTitle} ${queueContent} ${queueTimeContent} ${this.quantity ? this.quantity : ""} ${
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
      const rect = container.getBoundingClientRect();
      this.additionEmptyMargin = rect.width === 0 && rect.height === 0;
    }

    render() {
      return html`
        <div
          part="task-item-container"
          class="md-taskitem ${classMap({ selected: this.selected })}"
          tabindex=${this.sanitizedTabIndexForContainer}
          @click=${(e: MouseEvent) => this.handleClick(e)}
          @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e)}
          aria-label=${this.getAriaLabel()}
          aria-disabled=${ifDefined(this.disabled || undefined)}
        >
          <div class="md-taskitem__mediatype">
            ${getTaskTypeTemplate(this.isRestyle, this.mediaType, this.selected, this.status, this.iconSrc)}
            ${this.status && !this.isRestyle
              ? html` <span class=${`md-taskitem__status ` + `${this.status}`}> ${renderStatus(this.status)} </span> `
              : nothing}
          </div>
          <div class="md-taskitem__content" part="task-item-content">
            ${this.popovertitle
              ? html`
                  <span class="md-taskitem__content_popover_title"
                    ><md-tooltip placement="bottom" slot-to-tooltip>${this.popovertitle}</md-tooltip></span
                  >
                `
              : nothing}
            ${this.itemTitle
              ? html`
                  <span
                    class="md-taskitem__content_title ${classMap({
                      mainTitle: !this.popovertitle,
                      "display-only-title": this.displayOnlyTitle
                    })}"
                    ><md-tooltip placement="bottom" slot-to-tooltip>${this.itemTitle}</md-tooltip></span
                  >
                `
              : html`
                  <span class="md-taskitem__content_popover_title popover-item-title"><slot name="title"></slot></span>
                `}
            <div class="md-taskitem__content_inner">
              ${this.displayOnlyTitle
                ? nothing
                : html`
                    <span class="md-taskitem__content_queue">
                      <md-tooltip placement="bottom" slot-to-tooltip>
                        ${this.queue.length > 0 ? this.queue : html` <slot name="queue"></slot> `}
                      </md-tooltip>
                    </span>
                  `}
              ${this.queueTimeLabel.length > 0 || this.querySelector('[slot="queue-time"]')
                ? html`
                    <span class="md-taskitem__content_queue_time">
                      <div class="md-taskitem__content_queue_time_dot"></div>
                      ${this.queueTimeLabel}
                      <slot name="queue-time"></slot>
                    </span>
                  `
                : nothing}
            </div>
            ${this.lastmessage
              ? html`
                  <span class="md-taskitem__content_chat">
                    <span class="new-chat_massages">
                      <md-tooltip placement="bottom" slot-to-tooltip> ${this.lastmessage} </md-tooltip></span
                    >
                  </span>
                `
              : nothing}
            ${!this.lastmessage ? html` <slot name="lastmessage"></slot> ` : nothing}
          </div>
          <div class="md-taskitem__addition ${classMap({ empty_addition: this.additionEmptyMargin })}">
            <slot @slotchange=${this.handleAdditionSlotChange}></slot>
            ${renderChatCount(this.quantity, this.isRestyle, this)}
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
