/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

@customElement("md-menu-item")
export class MenuItem extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) inline = false;
  @property({ type: String }) href = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) selected = false;

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

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    if (this.label) {
      this.setAttribute("aria-label", this.label);
    }
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (changedProperties.has("disabled")) {
      this.selected = false;
      this.setAttribute("aria-disabled", `${this.disabled}`);
    }
  }

  handleClick() {
    this.selected = true;
    this.dispatchEvent(
      new CustomEvent("menu-item-click", {
        bubbles: true,
        composed: true
      })
    );
  }

  get menuItemClassMap() {
    return {
      [`md-menu-item--inline`]: this.inline,
      [`md-menu-item--selected`]: this.selected,
      disabled: this.disabled
    };
  }

  render() {
    
    return html`
      <li
        role="menuitem"
        class="md-menu-item ${classMap(this.menuItemClassMap)}" 
        ?disabled=${this.disabled}
        tabindex="-1" 
        aria-hidden="true"
        aria-selected="false"
        aria-label=${ifDefined(this.label)}
        @click=${() => this.handleClick()}>
        <a href="${ifDefined(this.href || undefined)}">
          <slot></slot>
        </a>
      </li>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-menu-item": MenuItem;
  }
}
