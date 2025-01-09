/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
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

export const linkSize = ["large", "midsize", "small"] as const;
export const inlineStyle = ["default", "error"] as const;

export namespace Link {
  export type Tag = (typeof linkTag)[number];
  export type Color = (typeof linkColor)[number];
  export type Role = (typeof linkRole)[number];
  export type Size = (typeof linkSize)[number];
  export type InlineStyle = (typeof inlineStyle)[number];

  @customElementWithCheck("md-link")
  export class ELEMENT extends LitElement {
    @property({ type: String, attribute: false }) color: Color = "";
    @property({ type: String }) ariaLabel = "";
    @property({ type: String }) ariaRole: Role = "link";
    @property({ type: Boolean }) disabled = false;

    //inline style should be blue not red in mdv2. Since updating inline style to blue
    //has a different meaning add a second property to handle the colour. by default it will be error
    @property({ type: Boolean }) inline = false;
    @property({ type: String, attribute: "inline-style" }) inlineStyle?: InlineStyle = undefined;
    @property({ type: Boolean }) inverted?: boolean = undefined;
    @property({ type: String }) href = "";
    @property({ type: String }) tag: Tag = "a";
    @property({ type: String }) target = "_self";
    @property({ type: String }) size?: Size = undefined;
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
        [`md-link--inline-style-${this.inlineStyle}`]: !!this.inlineStyle,
        [`${this.size}`]: !!this.size,
        inverted: this.inverted === true,
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
                aria-disabled=${ifDefined(this.disabled || undefined)}
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
                aria-disabled=${ifDefined(this.disabled || undefined)}
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
                aria-label=${ifDefined(this.ariaLabel || undefined)}
                aria-disabled=${ifDefined(this.disabled || undefined)}
                role=${this.ariaRole}
                part="link"
              >
                <slot></slot>
              </a>
            `;
        }
      };
      return html` ${linkElement()} `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-link": Link.ELEMENT;
  }
}
