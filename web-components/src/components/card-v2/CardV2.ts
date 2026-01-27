/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import "@/components/tooltip/Tooltip";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, nothing, PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Duration } from "luxon";
import styles from "./scss/module.scss";

const DISPLAY_FORMAT = "hh:mm:ss";

export enum CardState {
  DEFAULT = "default",
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export namespace CardV2 {
  @customElementWithCheck("md-card-v2")
  export class ELEMENT extends LitElement {
    @property({ type: String }) state: CardState = CardState.DEFAULT;
    @property({ type: String }) identifier?: string = undefined;
    @property({ type: String }) header?: string = undefined;
    @property({ type: String }) info?: string = undefined;
    @property({ type: String }) data?: string = undefined;
    @property({ type: Number }) createdTime = 0;
    @property({ type: Boolean }) active = false;
    @property({ type: Boolean, reflect: true }) expandable = false;
    @property({ type: String, attribute: "expand-aria-label" }) expandAriaLabel = "Expand for more details";

    @query('slot[name="card-extra-info"]')
    private readonly extraInfoSlot!: HTMLSlotElement;

    @state()
    private interval: number | undefined;

    @state()
    private renderedData = "";

    connectedCallback() {
      super.connectedCallback();
      this.checkForExtraInfoSlot();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.clearInterval();
    }

    private clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = undefined;
      }
    }

    static get styles() {
      return [reset, styles];
    }

    private get isCardActive() {
      return this.state === CardState.ACTIVE;
    }

    protected willUpdate(changedProperties: PropertyValues): void {
      super.willUpdate(changedProperties);
      if (changedProperties.has("active") || changedProperties.has("data") || changedProperties.has("createdTime")) {
        this.calculateRenderedData();
      }
    }

    expandCardToggled() {
      this.state = this.isCardActive ? CardState.DEFAULT : CardState.ACTIVE;
      this.dispatchEvent(
        new CustomEvent<{ identifier: string; active: boolean }>("expand-card-toggled", {
          detail: { identifier: this.identifier ?? "", active: this.isCardActive },
          bubbles: true,
          composed: true
        })
      );
    }

    private checkForExtraInfoSlot() {
      const hasExtraInfoSlotContent = this.extraInfoSlot?.assignedNodes().length > 0;
      if (hasExtraInfoSlotContent) {
        this.setAttribute("has-extra-info", "");
      } else {
        this.removeAttribute("has-extra-info");
      }
    }

    handleExtraInfoSlotChange(_event: Event) {
      this.checkForExtraInfoSlot();
    }

    private get cardClassMap() {
      return {
        "md-card-v2": true,
        [`md-card--${this.state}`]: true
      };
    }

    private get contentClassMap() {
      return {
        "md-card-v2-content": true,
        inactive: this.state === CardState.INACTIVE
      };
    }

    private get footerExpandClassMap() {
      return {
        "md-card-v2-footer-expand": true,
        hidden: !this.expandable
      };
    }

    private get expandCardHandler() {
      return this.expandable ? this.expandCardToggled : null;
    }

    private renderHeader() {
      return html`
        <div class="md-card-v2-header-title">
          <h3>${this.header}</h3>
          ${this.info
            ? html`
                <md-tooltip message="${this.info}" placement="top">
                  <md-button ariaLabel="${this.header}, ${this.data}, ${this.info}" size="20" variant="ghost" circle>
                    <md-icon slot="icon" name="info-badge-filled" iconSet="momentumDesign"></md-icon>
                  </md-button>
                </md-tooltip>
              `
            : nothing}
        </div>
      `;
    }

    private renderExpandButton() {
      return html`
        <div class="${classMap(this.footerExpandClassMap)}">
          <md-button ariaLabel="${this.expandAriaLabel}" circle size="28">
            <md-icon
              slot="icon"
              iconSet="momentumDesign"
              name=${this.isCardActive ? "arrow-circle-up-bold" : "arrow-circle-down-bold"}
              size="18"
            ></md-icon>
          </md-button>
        </div>
      `;
    }

    private renderFooter() {
      return html`
        <div class="md-card-v2-footer">
          <div class="md-card-v2-footer-content">
            <slot name="card-footer-content"></slot>
          </div>
          ${this.renderExpandButton()}
        </div>
      `;
    }

    private calculateRenderedData() {
      this.clearInterval();
      if (!this.active && this.data) {
        this.renderedData = this.data;
      } else if (this.active && this.createdTime > 0) {
        this.renderedData = Duration.fromMillis(Date.now() - this.createdTime).toFormat(DISPLAY_FORMAT);
        this.interval = window.setInterval(() => {
          this.renderedData = Duration.fromMillis(Date.now() - this.createdTime).toFormat(DISPLAY_FORMAT);
        }, 1000);
      }
    }

    render() {
      return html`
        <div class="${classMap(this.cardClassMap)}" @click=${this.expandCardHandler}>
          <div class="md-card-v2-header">${this.renderHeader()}</div>
          <div class="${classMap(this.contentClassMap)}">
            <h2>${this.renderedData}</h2>
            <div class="md-card-v2-content-extra-info">
              <slot name="card-extra-info" @slotchange=${this.handleExtraInfoSlotChange}></slot>
            </div>
          </div>
          ${this.renderFooter()}
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-card-v2": CardV2.ELEMENT;
  }
}
