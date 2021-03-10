/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, internalProperty, LitElement, property } from "lit-element";
import styles from "./scss/module.scss";
import "@/components/icon/Icon";
import "@/components/button/Button";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/favorite/Favorite";
import { repeat } from "lit-html/directives/repeat";
import { classMap } from "lit-html/directives/class-map";
import { nothing } from "lit-html";

export namespace Card {
  @customElementWithCheck("md-card")
  export class ELEMENT extends LitElement {
    @property({ type: String }) title = "title";
    @property({ type: String }) subtitle = "";
    @property({ type: String }) id = "";
    @property({ type: Boolean }) fullscreen = false;
    @property({ type: String }) info = "";
    @property({ type: Array }) menuOption: (string | { [key: string]: string })[] = [];

    @internalProperty() private full = false;

    static get styles() {
      return [reset, styles];
    }

    get cardClassMap() {
      return {
        "full-screen": this.full
      };
    }

    connectedCallback() {
      super.connectedCallback();
    }

    handleToggleExpandCollapse() {
      this.full = !this.full;
    }

    handleCardMenuEvent(event: MouseEvent, label: string) {
      event.preventDefault();
      const ev = label.toLowerCase();
      this.dispatchEvent(
        new CustomEvent<{ id: string; type: string }>("card-click", {
          detail: {
            id: this.id,
            type: ev
          },
          bubbles: true,
          composed: true
        })
      );
    }

    handleCardKeyDownEvent(event: KeyboardEvent, label: string) {
      this.dispatchEvent(
        new CustomEvent<{ id: string; type: string }>("card-keydown", {
          detail: {
            id: this.id,
            type: label.toLowerCase()
          },
          bubbles: true,
          composed: true
        })
      );
    }

    render() {
      return html`
        <div class="md-card ${classMap(this.cardClassMap)}" id="${this.id}" part="card">
          <div class="md-card-header">
            <slot name="card-header-icon">
              <md-favorite value="${`card-` + this.id}"></md-favorite>
            </slot>
            <div class="md-card-header-title">
              <slot name="card-header-title">
                <h1>${this.title}</h1>
                <h2>${this.subtitle}</h2>
              </slot>
            </div>
            <div class="md-card-header-actions">
              ${this.info
                ? html`
                    <md-tooltip message="${this.info}" placement="bottom">
                      <md-button ariaLabel="Card Info" class="md-card-info-icon" color="color-none" size="size-none">
                        <md-icon slot="icon" name="info_16"></md-icon>
                      </md-button>
                    </md-tooltip>
                  `
                : nothing}
              ${this.fullscreen
                ? html`
                    <md-button
                      @button-click=${this.handleToggleExpandCollapse}
                      ariaLabel="Maximaze Card"
                      class="md-card-max-icon"
                      color="color-none"
                      size="size-none"
                    >
                      <md-icon slot="icon" name=${this.full ? "minimize_16" : "maximize_16"}></md-icon>
                    </md-button>
                  `
                : nothing}
              <md-menu-overlay class="md-card-menu" placement="bottom-start">
                <md-button
                  ariaLabel="Menu"
                  class="md-card-menu-icon"
                  color="color-none"
                  size="size-none"
                  slot="menu-trigger"
                >
                  <md-icon slot="icon" name="more-adr_16"></md-icon>
                </md-button>
                <div class="md-card-menu-list-items" style="width: 100%;">
                  <md-list>
                    ${repeat(
                      this.menuOption,
                      (item, idx) =>
                        html`
                          <md-list-item
                            class="${`menu-item-` + idx}"
                            slot="list-item"
                            @click=${(e: MouseEvent) => this.handleCardMenuEvent(e, item as string)}
                            @keydown=${(e: KeyboardEvent) => this.handleCardKeyDownEvent(e, item as string)}
                            >${item}</md-list-item
                          >
                        `
                    )}
                  </md-list>
                </div>
              </md-menu-overlay>
            </div>
          </div>
          <div class="md-card-content">
            <slot name="content"></slot>
          </div>
          <div class="md-card-footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-card": Card.ELEMENT;
  }
}
