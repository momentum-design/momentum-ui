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
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { nothing } from "lit-html";
import styles from "./scss/module.scss";


export const cardType = ["default", "active", "inactive"];

export namespace CardV2 {
  export type Type = (typeof cardType)[number];

  @customElementWithCheck("md-card-v2")
  export class ELEMENT extends LitElement {
    @property({ type: String }) type: CardV2.Type = "default";
    @property({ type: String }) identifier?: string = undefined;
    @property({ type: String }) header?: string = undefined;
    @property({ type: String }) info?: string = undefined; 
    @property({ type: String }) data?: string = undefined;
    @property({ type: Boolean }) expandable = false;

    connectedCallback() {
      super.connectedCallback();
    }

    static get styles() {
      return [reset, styles];
    }

    private get isActive() {
      return this.type === "active";
    }

    expandCardToggled() {
      this.type = this.isActive ? "default" : "active";
      this.dispatchEvent(
        new CustomEvent<{ identifier: string, active: boolean }>("expand-card-toggled", {
          detail: { identifier: this.identifier ?? "", active: this.isActive },
          bubbles: true,
          composed: true
        })
      );
    }

    private get cardClassMap() {
      return {
        "md-card-v2": true,
        [`md-card--${this.type}`]: true
      };
    }

    private get contentClassMap() {
      return {
        "md-card-v2-content": true,
        inactive: this.type === "inactive"
      };
    }

    private get footerClassMap() {
      return {
        "md-card-v2-footer": true,
        hidden: !this.expandable
      };
    }

    private renderHeader() {
      return html`
        <div class="md-card-v2-header-title">
          <h3>${this.header}</h3>
          ${this.info
            ? html`
                <md-tooltip message="${this.info}" placement="top">
                  <md-button
                    ariaLabel="${this.info}"
                    size="20"
                    variant="ghost"
                    circle
                  >
                    <md-icon slot="icon" name="info-badge-filled" iconSet="momentumDesign"></md-icon>
                  </md-button>
                </md-tooltip>
              `
            : nothing}       
        </div>
      `;
    }

    private renderFooter() {
      return html`
          <div class="class=${classMap(this.footerClassMap)}" >
            <md-button
              ariaLabel=""
              circle
              size="28"
              @click=${this.expandCardToggled}>
              <md-icon 
                slot="icon" 
                name=${this.isActive ? "arrow-circle-down_16" : "arrow-circle-up_16"} 
                size="18">
              </md-icon>
            </md-button>
          </div>
      `;
    }

    render() {
      return html`
        <div class="${classMap(this.cardClassMap)}">
          <div class="md-card-v2-header">
            ${this.renderHeader()}
          </div>
          <div class="${classMap(this.contentClassMap)}">
            <h2>${this.data}</h2>
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
