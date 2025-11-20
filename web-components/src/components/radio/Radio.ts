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
import { html, LitElement, property } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";

export namespace Radio {
  @customElementWithCheck("md-radio")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Number, reflect: true }) tabIndex = -1;
    @property({ type: String }) label = "";
    @property({ type: String }) value = "";
    @property({ type: String }) message = "";
    @property({ type: Boolean }) hideMessage = false;
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
      if (value) {
        this.tabIndex = -1;
      } else {
        this.tabIndex = 0;
      }
      this.requestUpdate("disabled", oldValue);
    }

    @property({ type: Boolean, reflect: true })
    checked = false;

    private get inputAriaLabel(): string | undefined {
      const helpText = this.message?.length ? ` - ${this.message}` : "";

      if (this.ariaLabel?.length) {
        return this.ariaLabel;
      }

      if (this.label?.length) {
        return this.label + helpText;
      }

      const textContent = this.textContent?.trim();
      return textContent?.length ? textContent + helpText : helpText;
    }

    static get styles() {
      return [reset, styles];
    }

    private get helpTextClassMap() {
      return {
        "md-radio-help-text--hide": this.hideMessage
      };
    }

    messagesTemplate() {
      return this.message?.length
        ? html`
            <div class="${classMap(this.helpTextClassMap)}">
              <md-help-text class="help-text-radio" newMomentum role="alert" aria-live="assertive">
                ${this.message}
              </md-help-text>
            </div>
          `
        : nothing;
    }

    render() {
      return html`
        <div class="md-radio-wrapper" part="radio-wrapper">
          <div class="md-radio-icon"></div>
          <input
            class="md-radio-input"
            part="radio-input"
            type="radio"
            role="radio"
            aria-label=${ifDefined(this.inputAriaLabel)}
            aria-checked=${this.checked ? "true" : "false"}
            .value=${this.value}
            ?checked=${this.checked}
            ?autofocus=${this.autofocus}
            ?disabled=${this.disabled}
            tabindex="-1"
            id="radio-label"
          />
          <label for="radio-label" class="md-radio-label" part="radio-label" @click=${(e: Event) => e.preventDefault()}>
            <slot></slot>
          </label>
        </div>
        ${this.messagesTemplate()}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-radio": Radio.ELEMENT;
  }
}
