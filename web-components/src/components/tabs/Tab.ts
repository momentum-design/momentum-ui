/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { FocusMixin } from "@/mixins";
import reset from "@/wc_scss/reset.scss";
import { customElement, html, LitElement, property, PropertyValues } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export type TabClickEvent = { id: string };
export type TabKeyDownEvent = { id: string; key: string };

@customElement("md-tab")
export class Tab extends FocusMixin(LitElement) {
  @property({ type: Number, reflect: true }) tabIndex = -1;
  @property({ type: String }) label = "";

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

  private _selected = false;
  @property({ type: Boolean, reflect: true })
  get selected() {
    return this._selected;
  }

  set selected(value: boolean) {
    const oldValue = this._selected;
    this._selected = value;
    this.setAttribute("aria-selected", `${value}`);
    this.requestUpdate("selected", oldValue);
  }

  @property({ type: Boolean, reflect: true }) viewportHidden = false;

  static get styles() {
    return [reset, styles];
  }

  handleClick(event: MouseEvent) {
    event.preventDefault();

    if (this.id) {
      this.dispatchEvent(
        new CustomEvent<TabClickEvent>("tab-click", {
          detail: {
            id: this.id
          },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (this.id) {
      this.dispatchEvent(
        new CustomEvent<TabKeyDownEvent>("tab-keydown", {
          detail: {
            id: this.id,
            key: event.code
          },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (changedProperties.has("disabled")) {
      this.selected = false;
      this.setAttribute("aria-disabled", `${this.disabled}`);
    }
  }

  private setupEvents() {
    this.addEventListener("mousedown", this.handleClick);
    this.addEventListener("keydown", this.handleKeyDown);
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-selected", "false");
  }

  protected firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    this.setAttribute("role", "tab");
    if (this.label) {
      this.setAttribute("aria-label", this.label);
    }
    this.setupEvents();
  }

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        role="tab"
        aria-hidden="true"
        aria-selected="false"
        aria-label=${ifDefined(this.label)}
        tabindex="-1"
        part="tab"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-tab": Tab;
  }
}
