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
import { classMap } from "lit-html/directives/class-map.js";
import styles from "./scss/module.scss";

export namespace Label {
  export type LabelEventDetail = { htmlFor: string };

  @customElementWithCheck("md-label")
  export class ELEMENT extends LitElement {
    @property({ type: String }) label = "";
    @property({ type: String }) theme = "";
    @property({ type: Boolean }) radioLabel = false;
    @property({ type: Boolean }) checkboxLabel = false;
    @property({ type: Boolean }) toggleSwitchLabel = false;
    @property({ type: String }) htmlFor = "";
    @property({ type: Boolean }) active = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) indeterminate = false;
    @property({ type: Boolean }) secondaryLabel = false;

    static get styles() {
      return [reset, styles];
    }
    setFocus() {
      this.dispatchEvent(new CustomEvent("setFocus"));
    }

    get labelClassMap() {
      return {
        [`md-label--${this.theme}`]: !!this.theme,
        "md-radio__label": this.radioLabel,
        "md-checkbox__label": this.checkboxLabel,
        "md-secondary-label": this.secondaryLabel,
        active: this.active,
        disabled: this.disabled,
        indeterminate: this.indeterminate
      };
    }

    handleClick() {
      this.setFocus();
      this.dispatchEvent(
        new CustomEvent<LabelEventDetail>("label-click", {
          composed: true,
          bubbles: true,
          detail: {
            htmlFor: this.htmlFor
          }
        })
      );
    }

    render() {
      return html`
        <label
          @click="${() => this.handleClick()}"
          class="md-label ${classMap(this.labelClassMap)}"
          for="${this.htmlFor}"
        >
          ${this.label ? html` <span>${this.label}</span> ` : html` <slot></slot> `}
        </label>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-label": Label.ELEMENT;
  }
}
