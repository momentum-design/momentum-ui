/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, PropertyValues } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export namespace Radio {
  @customElementWithCheck("md-radio")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Number, reflect: true }) tabIndex = -1;
    @property({ type: String }) label = "";
    @property({ type: String }) value = "";
    @property({ type: String }) ariaLabel = "";
    @property({ type: Boolean, reflect: true }) autofocus = false;

    private _disabled = false;
    @property({ type: Boolean, reflect: true })
    get disabled() {
      return this._disabled;
    }
    set disabled(value: boolean) {
      const oldValue = this._disabled;
      this._disabled = value;
      this.setAttribute("aria-disabled", `${value}`);
      if (value) {
        this.tabIndex = -1;
      } else {
        this.tabIndex = 0;
      }
      this.requestUpdate("disabled", oldValue);
    }

    private _checked = false;
    @property({ type: Boolean, attribute: false })
    get checked() {
      return this._checked;
    }
    set checked(value: boolean) {
      const oldValue = this._checked;
      this._checked = value;
      this.setAttribute("aria-checked", `${value}`);
      this.requestUpdate("checked", oldValue);
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      this.setAttribute("role", "radio");

      if (this.label) {
        this.setAttribute("aria-label", this.label);
      }
    }

    static get styles() {
      return [reset, styles];
    }

    render() {
      return html`
        <div class="md-radio-wrapper" part="radio-wrapper">
          <input
            class="md-radio-input"
            type="radio"
            aria-label=${ifDefined(this.ariaLabel.length ? this.ariaLabel : undefined)}
            .value=${this.value}
            ?checked=${this.checked}
            ?autofocus=${this.autofocus}
            ?disabled=${this.disabled}
            aria-hidden="true"
            id="radio-label"
          />
          <label for="radio-label" class="md-radio-label" part="radio-label"><slot></slot></label>
        </div>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-radio": Radio.ELEMENT;
  }
}
