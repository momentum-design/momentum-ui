/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Icon } from "@/components/icon/Icon";
import { PlacementType } from "@/components/popover/Popover.types";
import "@/components/progress-bar/ProgressBar";
import "@/components/tooltip/Tooltip";
import { Key } from "@/constants";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import reset from "@/wc_scss/reset.scss";
import { html, internalProperty, LitElement, property, PropertyValues } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import styles from "./scss/module.scss";

export namespace Chip {
  export type Role = "group" | "option" | "button";
  export type Placement = PlacementType;

  @customElementWithCheck("md-chip")
  export class ELEMENT extends LitElement {
    @property({ type: String }) color = "";
    @property({ type: String }) bgColor = "";
    @property({ type: String }) textColor = "";
    @property({ type: String }) height = "";
    @property({ type: String }) icon = "";
    @property({ type: String }) iconColor = "";
    @property({ type: String }) iconSize: string | undefined = "";
    @property({ type: String }) role: Chip.Role = "group";
    @property({ type: String, reflect: true }) id = "";
    @property({ type: Boolean }) small = false;
    @property({ type: Boolean }) readonly = false;
    @property({ type: Boolean, reflect: true }) selected = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Number }) determinateProgress = 0;
    @property({ type: Boolean }) indeterminateProgress = false;
    @property({ type: String }) tooltipText = "";
    @property({ type: String }) tooltipPlacement: Chip.Placement = "auto";
    @property({ type: String }) iconSet: Icon.IconSet | undefined = "momentumUI";
    @property({ type: Boolean, attribute: "suppress-default-max-width" }) suppressDefaultMaxWidth = false;
    @property({ type: Boolean }) decorative = false;

    @property({
      type: String,
      hasChanged(newVal, oldVal) {
        return newVal !== oldVal;
      }
    })
    value = "";

    @internalProperty({
      hasChanged(newVal, oldVal) {
        return newVal !== oldVal;
      }
    })
    private textOverflow = false;
    @internalProperty()
    private renderedText = "";

    connectedCallback() {
      super.connectedCallback();
      this.truncStringPortion(this.value);
      this.setAttribute("role", this.role);
    }

    updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      this.truncStringPortion(this.value);
    }

    // String truncation parameters
    MAX_LENGTH = 18;
    PRE_TRUNC_CHARS = 6;
    POST_TRUNC_CHARS = 9;
    DOT_COUNT = 3;

    truncStringPortion(
      str: string,
      firstCharCount = this.PRE_TRUNC_CHARS,
      endCharCount = this.POST_TRUNC_CHARS,
      dotCount = this.DOT_COUNT
    ): void {
      if (this.value.length > this.MAX_LENGTH) {
        let convertedStr = "";
        convertedStr += str.substring(0, firstCharCount);
        convertedStr += ".".repeat(dotCount);
        convertedStr += str.substring(str.length - endCharCount, str.length);
        this.renderedText = convertedStr;
        this.textOverflow = true;
      } else {
        this.renderedText = this.value;
      }
    }

    protected selectionChange = (newState: boolean) => {
      this.dispatchEvent(
        new CustomEvent<{ selected: boolean }>("chip-selected", {
          composed: true,
          bubbles: true,
          detail: { selected: newState }
        })
      );
    };

    public handleClear = (chipId: string) => {
      this.dispatchEvent(
        new CustomEvent<{ id: string }>("chip-deleted", {
          composed: true,
          bubbles: true,
          detail: { id: chipId }
        })
      );
    };

    public handleSelect = () => {
      // sets selected state to true and dispatches event
      if (!this.disabled) {
        this.selected = true;
        this.selectionChange(true);
      }
    };

    public handleDeSelect = () => {
      // sets selected state to false and dispatches event
      this.selected = false;
      this.selectionChange(false);
    };

    handleClick() {
      const tooltip = this.shadowRoot?.querySelector("md-tooltip");
      tooltip?.dispatchEvent(
        new CustomEvent("tooltip-destroy", {
          bubbles: true,
          composed: true,
          detail: {
            placement: tooltip?.placement,
            reference: tooltip?.reference,
            popper: tooltip?.popper
          }
        })
      );
      this.dispatchEvent(
        new CustomEvent("chip-interaction", {
          composed: true,
          bubbles: true,
          detail: { id: this.id }
        })
      );
    }

    protected handleKeydown(event: KeyboardEvent) {
      switch (event.code) {
        case Key.Space:
        case Key.Enter:
          this.handleSelect();
          this.handleClick();
          break;

        default:
          break;
      }
    }

    protected renderBgColor = () => {
      return this.bgColor ? `background-color: ${this.bgColor};` : nothing;
    };
    protected renderTextColor = () => {
      return this.textColor ? `color: ${this.textColor};` : nothing;
    };
    protected renderHeight = () => {
      return this.height ? `height: ${this.height};` : nothing;
    };

    protected getStyles = () => {
      if (this.bgColor || this.textColor || this.height) {
        return html`
          <style>
            :host .md-chip {
              ${this.renderBgColor()};
              ${this.renderTextColor()};
              ${this.renderHeight()};
            }
          </style>
        `;
      } else return nothing;
    };

    static get styles() {
      return [reset, styles];
    }

    protected loadingTemplate() {
      if (this.determinateProgress || this.indeterminateProgress) {
        return this.determinateProgress
          ? html`
              <md-progress-bar
                class="md-chip--loading"
                type="determinate"
                value="${this.determinateProgress}"
                displayFormat="none"
              >
              </md-progress-bar>
            `
          : html`
              <md-progress-bar class="md-chip--loading" type="indeterminate" displayFormat="none"></md-progress-bar>
            `;
      } else return nothing;
    }

    protected iconTemplate() {
      const iconColor = !this.disabled ? this.iconColor : "";
      return this.icon
        ? html`
            <md-icon
              class="md-chip--icon"
              part="chip-icon"
              name="${this.icon}"
              color="${iconColor}"
              iconSet=${ifDefined(this.iconSet)}
              size="${ifDefined(this.iconSize)}"
            >
            </md-icon>
          `
        : nothing;
    }

    getToolTipContent() {
      if (this.tooltipText && this.textOverflow) {
        return this.value === this.tooltipText ? this.tooltipText : `${this.value}, ${this.tooltipText}`;
      } else {
        return this.tooltipText ? this.tooltipText : this.value;
      }
    }

    private get textContentClassMap() {
      return {
        "md-chip--textcontent": true,
        "md-chip--suppress-default-max-width": this.suppressDefaultMaxWidth
      };
    }

    private get textContentTemplate() {
      return html`<span class=${classMap(this.textContentClassMap)}> ${this.renderedText}</span>`;
    }

    render() {
      const classNamesInfo = {
        "md-chip--small": this.small,
        "md-chip--disabled": this.disabled,
        [`md-chip--${this.color}`]: this.color,
        "suppress-max-width": this.suppressDefaultMaxWidth
      };

      const ariaPressed = !this.decorative ? (this.selected ? "true" : "false") : undefined;

      return html`
        ${this.getStyles()}
        <md-tooltip
          ?disabled=${!this.tooltipText && !this.textOverflow}
          message="${this.getToolTipContent()}"
          placement="${this.tooltipPlacement}"
          part="tooltip"
        >
          <span
            role=${ifDefined(!this.decorative ? "button" : undefined)}
            tabindex="0"
            class="md-chip ${classMap(classNamesInfo)}"
            part="chip"
            aria-pressed=${ifDefined(ariaPressed)}
            @click=${!this.decorative ? () => this.handleClick() : undefined}
            @keydown=${!this.decorative ? (e: KeyboardEvent) => this.handleKeydown(e) : undefined}
          >
            ${this.loadingTemplate()} ${this.iconTemplate()}
            <slot name="custom-left-content" part="chip-left"> </slot>
            ${this.renderedText ? this.textContentTemplate : nothing}
            <slot name="custom-right-content" part="chip-right"> </slot>
          </span>
        </md-tooltip>
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-chip": Chip.ELEMENT;
  }
}
