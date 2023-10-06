/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/favorite/Favorite";
import "@/components/icon/Icon";
import "@/components/list/List";
import "@/components/list/ListItem";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";
import { repeat } from "lit-html/directives/repeat";
import { Key } from "../../constants"; // Keep type import as a relative path
import styles from "./scss/module.scss";

export namespace Card {
  @customElementWithCheck("md-card")
  export class ELEMENT extends LitElement {
    @property({ type: String }) title = "title";
    @property({ type: String }) subtitle = "";
    @property({ type: String }) id = "";
    @property({ type: String }) info = "";
    @property({ type: String, attribute: "info-aria-label" }) infoAriaLabel = "Card Info";
    @property({ type: String, attribute: "menu-aria-label" }) menuAriaLabel = "Card Menu";
    @property({ type: Array }) menuOptions: (string | any)[] = [];

    static get styles() {
      return [reset, styles];
    }

    handleCardClick(event: MouseEvent) {
      this.dispatchEvent(
        new CustomEvent<{ id: string }>("card-click", {
          detail: {
            id: this.id
          },
          bubbles: true,
          composed: true
        })
      );
    }

    handleCardKeyDown(e: KeyboardEvent) {
      if (e.code === Key.Enter || e.code === Key.Space) {
        this.dispatchEvent(
          new CustomEvent<{ id: string }>("card-keydown", {
            detail: {
              id: this.id
            },
            bubbles: true,
            composed: true
          })
        );
      }
    }

    handleCardMenuEvent(event: MouseEvent, label: string) {
      event.stopPropagation();
      const ev = label.toLowerCase();
      this.dispatchEvent(
        new CustomEvent<{ id: string; type: string }>("card-menu-click", {
          detail: {
            id: this.id,
            type: ev
          },
          bubbles: true,
          composed: true
        })
      );
    }

    handleCardMenuKeyDown(event: KeyboardEvent, label: string) {
      event.preventDefault();
      this.dispatchEvent(
        new CustomEvent<{ id: string; type: string; keyCode: string }>("card-menu-keydown", {
          detail: {
            id: this.id,
            type: label.toLowerCase(),
            keyCode: event.code
          },
          bubbles: true,
          composed: true
        })
      );
    }

    render() {
      return html`
        <div
          class="md-card"
          id="${this.id}"
          part="card"
          tabindex="0"
          @click=${(ev: MouseEvent) => this.handleCardClick(ev)}
          @keydown=${(ev: KeyboardEvent) => this.handleCardKeyDown(ev)}
        >
          <div class="md-card-header">
            <slot name="card-header-aside">
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
                      <md-button
                        ariaLabel="${this.infoAriaLabel}"
                        class="md-card-info-icon"
                        color="color-none"
                        size="size-none"
                      >
                        <md-icon slot="icon" name="info_16"></md-icon>
                      </md-button>
                    </md-tooltip>
                  `
                : nothing}
              ${this.menuOptions.length
                ? html`
                    <md-menu-overlay class="md-card-menu" placement="bottom-start">
                      <md-button
                        ariaLabel="${this.menuAriaLabel}"
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
                            this.menuOptions,
                            (item, idx) =>
                              html`
                                <md-list-item
                                  class="${`menu-item-` + idx}"
                                  slot="list-item"
                                  @click=${(e: MouseEvent) => this.handleCardMenuEvent(e, item as string)}
                                  @keydown=${(e: KeyboardEvent) => this.handleCardMenuKeyDown(e, item as string)}
                                  >${item}</md-list-item
                                >
                              `
                          )}
                        </md-list>
                      </div>
                    </md-menu-overlay>
                  `
                : nothing}
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
