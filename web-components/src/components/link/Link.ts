/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export const linkTag = ["a", "div", "span"] as const;
export const linkColor = ["", "blue", "red", "green", "yellow", "orange"] as const;
export const linkRole = [
  "button",
  "checkbox",
  "link",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "radio",
  "switch",
  "tab"
] as const;

export namespace Link {
  export type Tag = typeof linkTag[number];
  export type Color = typeof linkColor[number];
  export type Role = typeof linkRole[number];

  @customElementWithCheck("md-link")
  export class ELEMENT extends LitElement {
    @property({ type: String, attribute: false }) color: Color = "";
    @property({ type: String }) ariaLabel = "";
    @property({ type: String }) ariaRole: Role = "link";
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) inline = false;
    @property({ type: String }) href = "";
    @property({ type: String }) tag: Tag = "a";
    @property({ type: String }) target = "_self";
    private _tabIndex = 0;
    @property({ type: Number, attribute: "tab-index", reflect: true })
    get tabIndex() {
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
              <div 
                class="md-link ${classMap(linkClassNamesInfo)}"
                tabindex=${this.tabIndex}  
                aria-label=${ifDefined(this.ariaLabel || undefined)} 
                aria-disabled="${ifDefined(this.disabled || undefined)}" 
                role=${this.ariaRole} 
                part="link"
              >
                <slot></slot>
              </div>
            `;
          case "span":
            return html`
              <span 
                class="md-link ${classMap(linkClassNamesInfo)}" 
                tabindex=${this.tabIndex}  
                aria-label=${ifDefined(this.ariaLabel || undefined)} 
                aria-disabled="${ifDefined(this.disabled || undefined)}" 
                role=${this.ariaRole} 
                part="link"
              > 
                <slot></slot>
              </span>
            `;

          default:
            return html`
              <a
                class="md-link ${classMap(linkClassNamesInfo)}"
                .target="${this.target}"
                href=${ifDefined(!this.disabled ? this.href : undefined)}
                tabindex=${this.tabIndex}
                aria-disabled="${this.disabled}"
                aria-label=${ifDefined(this.ariaLabel || undefined)}
                role=${this.ariaRole}
                part="link"
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
}

declare global {
  interface HTMLElementTagNameMap {
    "md-link": Link.ELEMENT;
  }
}
