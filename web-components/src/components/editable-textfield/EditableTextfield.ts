/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/input/Input";
import { customElementWithCheck } from "@/mixins/CustomElementCheck";
import { ValidationRegex } from "@/utils/validations";
import reset from "@/wc_scss/reset.scss";
import dompurify from "dompurify";
import { CSSResultArray, html, LitElement, property, PropertyValues, query } from "lit-element";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { numInputTypes } from "../../utils/enums"; // Keep type import as a relative path
import { Input } from "../input/Input"; // Keep type import as a relative path
import styles from "./scss/module.scss";

export const alignment = ["left", "right", "center"] as const;

export namespace EditableTextfield {
  export type Alignment = (typeof alignment)[number];
  export type InputType = (typeof numInputTypes)[number];

  @customElementWithCheck("md-editable-field")
  export class ELEMENT extends LitElement {
    @property({ type: String }) alignment: EditableTextfield.Alignment = "left";
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) isEditing = false;
    @property({ type: String, attribute: "max-lines", reflect: true }) maxLines = "";
    @property({ type: String, reflect: true }) content = "Click to edit text";
    @property({ type: Object }) message: Input.Message | undefined = {
      type: "error",
      message: `That is not a valid input.`
    };
    @property({ type: Boolean, reflect: true }) alert = false;
    @property({ type: Boolean }) hideMessage = false;
    @property({ type: String }) pattern = "";
    @property({ type: String }) type: EditableTextfield.InputType[number] | null = null;
    @property({ type: String }) ariaLabel = "editable field";
    @property({ type: String, attribute: "aria-described-by" }) ariaDescribedBy = "";

    private readonly messageController: Input.MessageController = new Input.MessageController();

    @query(".md-editable-textfield") editableField: HTMLElement | undefined;

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("focus", this.handleFocus);
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener("focus", this.handleFocus);
    }

    protected firstUpdated(changedProperties: PropertyValues) {
      super.firstUpdated(changedProperties);
      if (this.innerText && this.innerText.length > 0) {
        this.content = this.innerText.trim();
      } else {
        this.innerText = dompurify.sanitize(this.content);
      }
    }

    protected updated(changedProperties: PropertyValues) {
      super.updated(changedProperties);
      if (changedProperties.has("content")) {
        if (this.editableField) {
          this.editableField.innerText = dompurify.sanitize(this.content);
        }
      }
    }

    reportValidity = () => {
      this.dispatchEvent(
        new Event("invalid", {
          bubbles: false,
          cancelable: true,
          composed: true
        })
      );
    };

    checkValidity = (input: string): boolean => {
      let result = true;
      const regexTester = (regex: RegExp): void => {
        if (input.match(regex) === null) {
          result = false;
        }
      };
      if (this.pattern) {
        const regex = new RegExp(this.pattern);
        regexTester(regex);
      } else if (input && this.type) {
        switch (this.type) {
          case "integer":
            regexTester(new RegExp(ValidationRegex.integerString));
            break;
          case "decimal":
            regexTester(new RegExp(ValidationRegex.decimalString));
            break;
          default:
            break;
        }
      }
      return result;
    };

    handleFocus = () => {
      if (this.disabled) {
        return;
      } else {
        this.isEditing = true;
        this.setRange();
      }
    };

    setRange() {
      if (this.editableField) {
        const range = document.createRange();
        const sel = window.getSelection();
        const firstNode = this.editableField.childNodes[0];
        const position = firstNode?.nodeValue?.length || 0;

        if (firstNode) {
          range.setStart(firstNode, position);
          range.collapse(true);
        }

        if (sel && sel.toString().length === 0) {
          sel.removeAllRanges();
          sel.addRange(range);
        } else {
          return;
        }

        if (this.maxLines.length > 0) {
          this.editableField.scrollTop = this.editableField.scrollHeight;
        }
      }
    }

    handleKeydown = (e: KeyboardEvent) => {
      const flaggedKeys = ["Tab", "Meta", "Shift", "Delete", "Backspace", "Arrow"];
      const { key, code } = e;

      if (flaggedKeys.some((s) => code.includes(s))) {
        return;
      }

      if (
        (this.type === "integer" && key.includes(".")) ||
        ((this.type === "integer" || this.type === "decimal") && code.match("Space"))
      ) {
        e.preventDefault();
      }

      const currentString = this.editableField?.innerText.trim() + key;
      if (this.type) {
        if (isNaN(Number(currentString))) {
          e.preventDefault();
        } else if (this.type === "integer" && !Number.isInteger(Number(currentString))) {
          e.preventDefault();
        } else {
          return;
        }
      }
    };

    handleBlur = () => {
      this.isEditing = false;
      if (this.maxLines.length > 0) {
        this.editableField?.scrollTo(0, 0);
      }
      this.content = this.editableField?.innerText.trim() || "";
      this.alert = false;
      this.handleValidation();
    };

    handleValidation() {
      if (this.type || this.pattern) {
        const valid = this.checkValidity?.(this.content);
        if (!valid) {
          this.reportValidity();
          this.showAlert();
        }
      } else {
        return;
      }
    }

    showAlert(): void {
      this.alert = true;
    }

    static get styles(): CSSResultArray {
      return [reset, styles];
    }

    get overflowStyles() {
      return (
        this.maxLines.length &&
        this.maxLines.length > 0 &&
        `max-height: ${2 * parseInt(this.maxLines)}rem; -webkit-line-clamp: ${this.maxLines}; word-break: break-all;`
      );
    }

    messagesTemplate() {
      return this.alert
        ? html`
            <div class="md-editable-textfield__messages" style="display: ${this.hideMessage ? "none" : "block"}">
              <md-help-text
                id="alert-message"
                role="alert"
                aria-live="assertive"
                .messageType=${this.message?.type}
                aria-errormessage=${ifDefined(this.message?.message)}
              >
                ${this.message?.message}
              </md-help-text>
            </div>
          `
        : nothing;
    }

    render() {
      const classes = {
        [`md-editable-textfield--${this.alignment}`]: this.alignment,
        "md-editable-textfield--disabled": this.disabled,
        [`md-editable-textfield--${this.message?.type}`]: this.alert && !!this.message,
        "md-editable-textfield--textoverflow": this.maxLines.length > 0 && !this.isEditing
      };

      return html`
        <div
          style="${this.overflowStyles}"
          class="md-editable-textfield ${classMap(classes)}"
          role=${ifDefined(!this.disabled ? "textbox" : undefined)}
          tabindex=${this.disabled ? "-1" : "0"}
          ?contenteditable=${this.isEditing}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
          @keydown=${(e: KeyboardEvent) => {
            this.handleKeydown(e);
          }}
          aria-invalid=${ifDefined(!this.disabled ? (this.alert ? "true" : "false") : undefined)}
          aria-label=${ifDefined(!this.disabled ? this.ariaLabel : undefined)}
          aria-describedby=${ifDefined(!this.disabled ? this.ariaDescribedBy : undefined)}
        >
          ${dompurify.sanitize(this.content)}
        </div>
        ${this.messagesTemplate()}
      `;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "md-editable-field": EditableTextfield.ELEMENT;
  }
}
