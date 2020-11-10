/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export type LinkTag = "a" | "div" | "span";
export const linkTag = ["a", "div", "span"];
export type LinkColor = "" | "blue" | "red" | "green" | "yellow" | "orange";

@customElement("md-link")
export class Link extends LitElement {
  @property({ type: String, attribute: false }) color: LinkColor = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) inline = false;
  @property({ type: String }) href = "";
  @property({ type: String }) tag: LinkTag = "a";
  @property({ type: String }) target = "_self";
  private _tabIndex = 0;
  @property({ type: Number, attribute: "tab-index", reflect: true })
  get tabIndex() {
    if (this.disabled) {
      return -1;
    }
    return this._tabIndex;
  }
  set tabIndex(newValue: number) {
    const oldValue = this._tabIndex;
    this._tabIndex = newValue;
    this.requestUpdate("tabIndex", oldValue);
  }

  static get styles() {
    return [reset, styles];
  }

  render() {
    const linkClassNamesInfo = {
      [`md-link--${this.color}`]: this.color,
      [`md-link--inline`]: this.inline,
      disabled: this.disabled
    };

    const linkElement = () => {
      switch (this.tag) {
        case "div":
          return html`
            <div class="md-link ${classMap(linkClassNamesInfo)}" tabindex=${this.tabIndex} role="link">
              <slot></slot>
            </div>
          `;
        case "span":
          return html`
            <span class="md-link ${classMap(linkClassNamesInfo)}" tabindex=${this.tabIndex} role="link">
              <slot></slot>
            </span>
          `;

        default:
          return html`
            <a
              class="md-link ${classMap(linkClassNamesInfo)}"
              .target="${this.target}"
              href=${this.href}
              tabindex=${this.tabIndex}
              role="link"
            >
              <slot></slot>
            </a>
          `;
      }
    };
    return html`
      ${linkElement()}
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "md-link": Link;
  }
}
