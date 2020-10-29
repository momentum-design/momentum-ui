/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import "../button/Button";
import "../icon/Icon";
import styles from "./scss/module.scss";
import { nothing } from "lit-html";

@customElement("md-alert")
export class Alert extends LitElement {
  @property({ type: Boolean }) closable = false;
  @property({ type: String }) message = "";
  @property({ type: Boolean }) show = false;
  @property({ type: Boolean }) internalClose = true;
  @property({ type: String }) title = "";
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
          <md-icon name="icon-warning_32" color="red"></md-icon>
        `;
        break;
      case "info":
        return html`
          <md-icon name="info_32" color="blue"></md-icon>
        `;
        break;
      case "success":
        return html`
          <md-icon name="check-circle_36" color="green"></md-icon>
        `;
        break;
      case "warn":
      case "warning":
        return html`
          <md-icon name="icon-warning_32" color="orange"></md-icon>
        `;
        break;
      default:
        return html`
          <slot name="alert-icon"></slot>
        `;
        break;
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
            <div part="alert" class="md-alert ${classMap(this.alertClassMap)}">
              <div class="md-alert__icon">
                ${this.renderIconTemplate()}
              </div>
              <div part="content" class="md-alert__content">
                <div class="md-alert__title">
                  ${this.title}
                </div>
                <div class="md-alert__message">
                  ${this.message}
                  <slot name="alert-body"></slot>
                </div>
              </div>
              ${this.closable
                ? html`
                    <div class="md-alert__button">
                      <md-button hasRemoveStyle color="color-none" circle @click="${() => this.close()}">
                        <md-icon name="icon-cancel_16"></md-icon>
                      </md-button>
                    </div>
                  `
                : html`
                    <div class="md-alert__footer">
                      <slot name="alert-footer"></slot>
                    </div>
                  `}
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-alert": Alert;
  }
}
