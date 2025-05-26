/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Key } from "@/constants";
import { FocusMixin } from "@/mixins";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, LitElement, PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import styles from "./scss/module.scss";

export namespace Checkbox {
  export interface CheckboxChangeEventDetail {
    sourceEvent: Event;
    checked: boolean;
  }

  /**
   * Fired when the checkbox state changes
   * @event checkbox-change
   * @type {CustomEvent<CheckboxChangeEventDetail>}
   */
  @customElementWithCheck("md-checkbox")
  export class ELEMENT extends FocusMixin(LitElement) {
    @property({ type: Boolean, reflect: true }) autofocus = false;
    private _checked = false;
    @property({ type: Boolean, reflect: true })
    get checked() {
      return this._checked;
    }
    set checked(value: boolean) {
      const oldValue = this._checked;
      this._checked = value;
      if (!this.indeterminate) {
        this.setAttribute("aria-checked", `${value}`);
      }
      this.requestUpdate("checked", oldValue);
    }

    private _indeterminate = false;
    @property({ type: Boolean, reflect: true })
    get indeterminate() {
      return this._indeterminate;
    }
    set indeterminate(value: boolean) {
      const oldValue = this._indeterminate;
      this._indeterminate = value;
      this.setAttribute("aria-checked", "mixed");
      this.requestUpdate("indeterminate", oldValue);
    }

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

    @property({ type: String }) label = "";
    @property({ type: Number, reflect: true }) tabIndex = 0;

    @query(".checkbox-input") input!: HTMLInputElement;

    static get styles() {
      return [reset, styles];
    }

    private toggleCheckbox() {
      this.checked = !this.checked;
    }

    private isCheckboxActive() {
      return this.disabled || this.indeterminate;
    }

    handleClick(event: MouseEvent) {
      if (this.isCheckboxActive()) {
        event.stopPropagation();
      } else {
        this.toggleCheckbox();
        this.handleChange(event);
      }
    }

    handleKeyDown(event: KeyboardEvent) {
      const { code } = event;
      if (code === Key.Space || code === Key.Enter) {
        event.preventDefault();
        if (this.isCheckboxActive()) {
          event.stopPropagation();
        } else {
          this.toggleCheckbox();
          this.handleChange(event);
        }
      }
    }

    handleChange(event: Event) {
      this.dispatchEvent(
        new CustomEvent<CheckboxChangeEventDetail>("checkbox-change", {
          bubbles: true,
          composed: true,
          detail: {
            sourceEvent: event,
            checked: this.checked
          }
        })
      );
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);

      this.setAttribute("role", "checkbox");
      if (this.label) {
        this.setAttribute("aria-label", this.label);
      }
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("click", this.handleClick);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("keydown", this.handleKeyDown);
      this.removeEventListener("click", this.handleClick);
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties);
      if (changedProperties.has("indeterminate")) {
        this.checked = false;
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("indeterminate")) {
        this.input.indeterminate = this.indeterminate;
      }
    }

    render() {
      return html`
        <input
          class="checkbox-input"
          type="checkbox"
          part="checkbox-input"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?autofocus=${this.autofocus}
          aria-hidden="true"
        />
        <label part="checkbox-label" class="checkbox-label">
          <slot></slot>
        </label>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-checkbox": Checkbox.ELEMENT;
  }

  interface HTMLElementEventMap {
    "checkbox-change": CustomEvent<Checkbox.CheckboxChangeEventDetail>;
  }
}
