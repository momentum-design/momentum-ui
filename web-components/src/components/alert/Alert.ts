/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, property, TemplateResult } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import styles from "./scss/module.scss";

export namespace Alert {
  @customElementWithCheck("md-alert")
  export class ELEMENT extends LitElement {
    @property({ type: Boolean }) closable = false;
    @property({ type: String }) message = "";
    @property({ type: Boolean }) show = false;
    @property({ type: Boolean }) internalClose = true;
    @property({ type: String }) title = "";
    @property({ type: String }) btnlabel = "Close";
    @property({ type: String }) type = "default";
    @property({ type: Boolean }) inline = false;

    close() {
      this.dispatchEvent(
        new CustomEvent("alert-close", {
          composed: true,
          bubbles: true
        })
      );

      // By default closing internally, othervise - controlling outer via .show
      if (this.internalClose) {
        this.show = false;
      }
    }

    static get styles() {
      return [reset, styles];
    }

    renderIconTemplate = () => {
      switch (this.type) {
        case "error":
          return html`
            <md-icon
              name="warning-regular"
              size="32"
              iconSet="momentumDesign"
              color="var(--md-alert-error-text-color, red)"
            ></md-icon>
          `;
        case "info":
          return html`
            <md-icon
              name="info-circle-regular"
              size="32"
              iconSet="momentumDesign"
              color="var(--md-alert-info-text-color, blue)"
            ></md-icon>
          `;
        case "success":
          return html`
            <md-icon
              name="check-circle-regular"
              size="32"
              iconSet="momentumDesign"
              color="var(--md-alert-success-text-color, green)"
            ></md-icon>
          `;
        case "warn":
        case "warning":
          return html`
            <md-icon
              name="warning-regular"
              size="32"
              iconSet="momentumDesign"
              color="var(--md-alert-warning-text-color, orange)"
            ></md-icon>
          `;
        default:
          return html` <slot name="alert-icon"></slot> `;
      }
    };

    get alertClassMap() {
      return {
        [`md-alert--${this.type}`]: !!this.type,
        "md-alert__inline": this.inline
      };
    }

    render(): TemplateResult {
      return html`
        ${this.show
          ? html`
              <div role="alert" aria-live="polite" part="alert" class="md-alert ${classMap(this.alertClassMap)}">
              <div class="md-alert__icon aria-hidden="true">
                  ${this.renderIconTemplate()}
                </div>
                <div part="content" class="md-alert__content">
                ${
                  this.title && this.title !== ""
                    ? html` <div class="md-alert__title" role="heading" aria-level="1">${this.title}</div> `
                    : nothing
                }
                  <div class="md-alert__message">
                    ${this.message}
                    <slot name="alert-body"></slot>
                  </div>
                </div>
                ${
                  this.closable
                    ? html`
                        <div class="md-alert__button">
                          <md-button
                            arialabel="${this.btnlabel}"
                            hasRemoveStyle
                            color="color-none"
                            circle
                            @click="${() => this.close()}"
                          >
                            <md-icon slot="icon" name="cancel-bold" size="18" iconSet="momentumDesign"></md-icon>
                          </md-button>
                        </div>
                      `
                    : html`
                        <div class="md-alert__footer">
                          <slot name="alert-footer"></slot>
                        </div>
                      `
                }
              </div>
            `
          : nothing}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-alert": Alert.ELEMENT;
  }
}
